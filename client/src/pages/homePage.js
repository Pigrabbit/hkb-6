export default function HomePage() {
  return `
        <div class="home">
            <a class="login-btn" href="/auth/login">Login</a>
            <a class="logout-btn" href="/auth/logout">Logout</a>
            <a class="google-oauth-btn" href="/auth/google">Google+</a>
        </div>
    `;
}
