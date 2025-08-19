/** @type {import('next').NextConfig} */
const nextConfig = {

    // Aquí puedes añadir tus configuraciones, como el modo estricto
    reactStrictMode: true,

    // Configuración para permitir imágenes desde Cloudinary
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default nextConfig;
