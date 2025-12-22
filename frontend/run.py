import os
import subprocess
import platform
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))


def backend_cmd():
    if platform.system() == "Windows":
        return [
            os.path.join("backend", "venv", "Scripts", "python"),
            "-m",
            "uvicorn",
            "app.main:app",
            "--reload",
        ]
    else:
        return [
            os.path.join("backend", "venv", "bin", "python"),
            "-m",
            "uvicorn",
            "app.main:app",
            "--reload",
        ]


def frontend_cmd():
    if platform.system() == "Windows":
        return ["npm", "run", "dev"]
    else:
        return ["npm", "run", "dev"]


def main():
    print("Starting Inventory Billing App...\n")

    backend_dir = os.path.join(ROOT, "backend")
    frontend_dir = os.path.join(ROOT, "frontend", "app")

    try:
        print("Starting backend...")
        backend = subprocess.Popen(
            backend_cmd(),
            cwd=backend_dir,
            stdout=sys.stdout,
            stderr=sys.stderr,
        )

        print("Starting frontend...")
        frontend = subprocess.Popen(
            frontend_cmd(),
            cwd=frontend_dir,
            stdout=sys.stdout,
            stderr=sys.stderr,
        )

        print("\nApp is running!")
        print("Backend:  http://127.0.0.1:8000")
        print("Frontend: http://localhost:5173")
        print("\nPress CTRL+C to stop.\n")

        backend.wait()
        frontend.wait()

    except KeyboardInterrupt:
        print("\nShutting down...")
        backend.terminate()
        frontend.terminate()

    except Exception as e:
        print("\nailed to start app:")
        print(e)
        sys.exit(1)


if __name__ == "__main__":
    main()
