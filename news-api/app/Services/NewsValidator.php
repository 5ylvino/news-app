<?php

namespace App\Services;

use Illuminate\Support\Str;

class NewsValidator
{

    /**
     * @validate
     * Validate input values
     * @param mixed $article
     * @param string $source
     * @return void
     */
    static protected function validate(mixed $article, string $source)
    {

        switch ($source) {
            case NewsType::NEWS_API:
                $title = isset($article['title']) ? $article['title'] : null;
                $from = isset($article['source']) ? $article['source']['name'] : null;
                $content = isset($article['content']) ? $article['content'] : null;
                $category = isset($article['category']) ? $article['category'] : null;
                $author = isset($article['author']) ? $article['author'] : null;
                $publish_date = isset($article['publishedAt']) ? $article['publishedAt'] : null;

                return [
                    'title' => $title,
                    'source' => $from,
                    'content' => $content,
                    'category' => $category,
                    'author' => $author,
                    'publish_date' => $publish_date,
                ];

            case NewsType::GUARDIAN_API:
                $title = isset($article['webTitle']) ? Str::words($article['webTitle'], 5) : null;
                $from = isset($article['sectionName']) ? $article['sectionName'] : null;
                $content = isset($article['webTitle']) ? $article['webTitle'] : null;
                $category = isset($article['pillarName']) ? $article['pillarName'] : null;
                $author = isset($article['author']) ? $article['author'] : null;
                $publish_date = isset($article['webPublicationDate']) ? $article['webPublicationDate'] : null;

                return [
                    'title' => $title,
                    'source' => $from,
                    'content' => $content,
                    'category' => $category,
                    'author' => $author,
                    'publish_date' => $publish_date,
                ];

            case NewsType::NYTIMES_API:
                $title = isset($article['title']) ? $article['title'] : null;
                $from = isset($article['subsection']) ? $article['subsection'] : null;
                $content = isset($article['abstract']) ? $article['abstract'] : null;
                $category = isset($article['item_type']) ? $article['item_type'] : null;
                $author = isset($article['byline']) ? $article['byline'] : null;
                $publish_date = isset($article['published_date']) ? $article['published_date'] : null;

                return [
                    'title' => $title,
                    'source' => $from,
                    'content' => $content,
                    'category' => $category,
                    'author' => $author,
                    'publish_date' => $publish_date,
                ];

            default:
                return null;
        }
    }

    /**
     * @isNew
     * Check if the content is new content
     * @param string $current_date
     * @param string $previous_date
     * @return boolean
     */
    static protected function isNew(string $current_date, string $previous_date)
    {
        return strtotime($current_date) > strtotime($previous_date);
    }

    /**
     * @extract
     * Handles the extraction of required list from object
     * @param mixed $data
     * @param string $source
     * @return array
     */
    static protected function extractData($data, $source)
    {
        switch ($source) {
            case NewsType::NEWS_API:
                return $data->json()['articles'];

            case NewsType::GUARDIAN_API:
                return $data->json()['response']['results'];

            case NewsType::NYTIMES_API:
                return $data->json()['results'];

            default:
                return [];
        }
    }
}
