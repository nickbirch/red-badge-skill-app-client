let API_URL = "";

switch (window.location.hostname) {
    case "localhost" || "127.0.0.1":
        API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        break;
    case "red-badge-skill-app-server":
        API_URL = "https://red-badge-skill-app-server.herokuapp.com";
        break;
    case "red-badge-skill-app.herokuapp.com":
        API_URL = "https://red-badge-skill-app-server.herokuapp.com";
        break;
    default:
        API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
};

export default API_URL;