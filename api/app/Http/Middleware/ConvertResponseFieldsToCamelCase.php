<?php declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use function is_array;

class ConvertResponseFieldsToCamelCase
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        if ($response instanceof JsonResponse) {
            $data = json_decode($response->getContent(), true);
            $response->setData($this->convert($data));
        }
        return $response;
    }

    private function convert($data)
    {
        if (!is_array($data)) {
            return $data;
        }

        $replaced = [];
        foreach ($data as $key => $value) {
            $replaced[Str::camel($key)] = is_array($value)
                ? $this->convert($value)
                : $value;
        }
        return $replaced;
    }
}

