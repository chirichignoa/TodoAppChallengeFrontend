# Frontend

### Usage

Note: ensure that Docker is installed.

1. Run for build the docker image

   ```bash
   docker build --rm -t frontend:latest .
   ```

3. Finally, run

   ```bash
   docker run --rm -d -p 90:80/tcp frontend:latest
   ```

4. Enter to [localhost:90]()