<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class NewsService extends NewsValidator
{
    /**
     * @fetchNews
     * fetch new from external url
     * @param string $url
     * @param mixed $params
     * @param string $source
     * @return void
     */
    static private function fetchNews(string $url, mixed $params, string $source)
    {


        $last_article = DB::table('articles')
            ->latest('publish_date')
            ->first();

        $response = Http::get($url, $params);
        $articles = NewsValidator::extractData($response, $source);

        foreach ($articles as $article_picked) {
            $is_new_article = false;
            $article = NewsValidator::validate($article_picked, $source);

            if ($last_article) {
                $is_new_article = NewsValidator::isNew($article['publish_date'], $last_article->publish_date);
            }

            if ($article && $is_new_article || !$last_article) {

                Article::create([
                    'title' => $article['title'],
                    'source' => $article['source'],
                    'content' => $article['content'],
                    'category' => $article['category'],
                    'author' => $article['author'],
                    'publish_date' => $article['publish_date'],
                    'image_url' => $article['image_url'],
                ]);
            }
        }
    }

    /**
     * @newsContentLoader
     * Initializing a call to load news content
     * @return void
     */
    static public function newsContentLoader()
    {
        self::fetchNews('https://newsapi.org/v2/top-headlines', [
            'apiKey' => env('NEWS_API_KEY'),
            'country' => 'us',
        ], 'newsapi');

        self::fetchNews('https://content.guardianapis.com/search', [
            'api-key' => env('GUARDIAN_API_KEY'),
        ], 'guardianapis');

        self::fetchNews('https://api.nytimes.com/svc/topstories/v2/world.json', [
            'api-key' => env('NYTIMES_API_KEY'),
        ], 'nytimes');
    }
}
