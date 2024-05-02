<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
// use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        if (Auth::check() && Auth::user()->role == "admin") {
            return $next($request);
        } else {

            // dd(1);
            // abort(401);
            // Redirect::to('http://localhost:4200/signin');
            // return redirect()-;
            return redirect("http://localhost:4200/signin");
            // $redirectUrl = 'http://localhost:4200/signin';
            // return new RedirectResponse($redirectUrl);
        }
    }
}
