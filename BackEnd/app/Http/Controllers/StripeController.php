<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Session;
use Stripe;

class StripeController extends Controller
{
    public function index(){
        return view('index');
    }
    public function checkout(Request $request)
    {
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
    
        header('Content-Type: application/json');
    
        $checkout_session = \Stripe\Checkout\Session::create([
            'line_items'  => [
                [
                    'price_data' => [
                        'currency' => 'egp',
                        'product_data' => [
                            'name' => 'trip test'
                        ],
                        'unit_amount'  => 4000
                    ],
                    'quantity'   => 1
                ],
            ],
            'mode'        => 'payment',
            'success_url' => route('success'),
            'cancel_url'  => route('index'),
        ]);
    
        return redirect()->away($checkout_session->url);
    }
    public function success(){
        return view('index');
    }
}
