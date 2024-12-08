<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleListResource;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    /**
     * @listOfArticles
     * Show List of articles
     * @param Request $request
     * @return ArticleListResource
     */
    public function listOfArticles(Request $request)
    {

        $filters = $request->only([
            'title',
            'content',
            'author',
            'source',
            'category',
            'date'
        ]);

        $perPage = $request->get('per_page', 5);
        $articles = Article::filter($filters)->select([
            'title',
            'content',
            'author',
            'source',
            'category',
            'publish_date',
        ])->paginate($perPage);

        return ArticleListResource::collection($articles);
    }
}
