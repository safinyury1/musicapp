/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Добавьте если нужно настроить basePath (раскомментируйте если используете подпапку)
  // basePath: '/your-base-path',
  
  // Настройки для статических файлов
  images: {
    domains: ['ncsmusic.s3.eu-west-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ncsmusic.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // добавляем для локальных изображений
  },
  reactCompiler: true,
  
  // Дополнительные настройки для статических файлов
  trailingSlash: false,
  
  // Настройки для аудио файлов (если нужны)
  webpack: (config, { isServer }) => {
    // Добавляем поддержку аудио файлов
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      },
    });
    
    return config;
  },
};

export default nextConfig;