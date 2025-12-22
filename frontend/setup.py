import os
import subprocess
import sys
import platform
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))


class SetupError(Exception):
    pass


def run(cmd, cwd=None):
    try:
        print(f"> {cmd}")
        subprocess.check_call(cmd, shell=True, cwd=cwd)
    except subprocess.CalledProcessError as e:
        raise SetupError(f"Command failed: {cmd}") from e


def check_command(cmd, name):
    if shutil.which(cmd) is None:
        raise SetupError(f"{name} is not installed or not in PATH.")


def python_exe():
    return sys.executable


def pip_path():
    if platform.system() == "Windows":
        return "venv\\Scripts\\pip"
    else:
        return "venv/bin/pip"


def setup_backend():
    print("\n🐍 Setting up backend...")

    backend = os.path.join(ROOT, "backend")
    if not os.path.isdir(backend):
        raise SetupError("backend/ directory not found.")

    os.chdir(backend)

    if not os.path.exists("requirements.txt"):
        raise SetupError("backend/requirements.txt not found.")

    if not os.path.exists("venv"):
        print("Creating Python virtual environment...")
        run(f"{python_exe()} -m venv venv")

    pip = pip_path()
    if not os.path.exists(pip):
        raise SetupError("pip not found inside virtual environment.")

    print("Installing backend dependencies...")
    run(f"{pip} install --upgrade pip")
    run(f"{pip} install -r requirements.txt")


def setup_frontend():
    print("\n⚛️ Setting up frontend...")

    frontend = os.path.join(ROOT, "frontend", "app")
    if not os.path.isdir(frontend):
        raise SetupError("frontend/app directory not found.")

    if not os.path.exists(os.path.join(frontend, "package.json")):
        raise SetupError("package.json not found in frontend/app.")

    check_command("npm", "npm")

    print("Installing frontend dependencies...")
    run("npm install", cwd=frontend)


def main():
    print("🔧 Inventory Billing App setup starting...\n")

    try:
        check_command("python", "Python")
        setup_backend()
        setup_frontend()

    except SetupError as e:
        print("\n❌ SETUP FAILED")
        print(f"Reason: {e}")
        print("\nFix the issue above and re-run:")
        print("  python setup.py")
        sys.exit(1)

    except Exception as e:
        print("\n❌ UNEXPECTED ERROR")
        print(e)
        sys.exit(1)

    print("\n🎉 SETUP COMPLETE SUCCESSFULLY!")

    print("\n▶ Run backend:")
    print("  cd backend")
    print("  venv\\Scripts\\activate   (Windows)")
    print("  source venv/bin/activate (Linux/macOS)")
    print("  uvicorn app.main:app --reload")

    print("\n▶ Run frontend:")
    print("  cd frontend/app")
    print("  npm run dev")


if __name__ == "__main__":
    main()
