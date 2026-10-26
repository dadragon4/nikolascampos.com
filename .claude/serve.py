# Local preview server: like `python3 -m http.server`, but tells the
# browser not to cache, so edits show up on every reload.
import http.server, sys

class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
http.server.ThreadingHTTPServer(("", port), NoCache).serve_forever()
