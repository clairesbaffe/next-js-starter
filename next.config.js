/** @type {import('next').NextConfig} */
const nextConfig = {
  async middleware() {
    return ['/'];
  },
};

module.exports = nextConfig;
