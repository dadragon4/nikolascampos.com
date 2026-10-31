# Local preview server: like `python3 -m http.server`, but tells the
# browser not to cache, so edits show up on every reload.
import http.server, sys, urllib.parse

class NoCache(http.server.SimpleHTTPRequestHandler):
    # It listens on the local network (so a phone on the same Wi-Fi can
    # preview), so hidden files and folders like .git and .claude are refused.
    def send_head(self):
        path = urllib.parse.unquote(self.path.split("?", 1)[0].split("#", 1)[0])
        if any(part.startswith(".") for part in path.split("/") if part):
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
http.server.ThreadingHTTPServer(("", port), NoCache).serve_forever()
