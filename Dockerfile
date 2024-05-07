# Use an official Python runtime as a parent image
FROM python:3.9-alpine

# Set the working directory in the container to /app
RUN mkdir /app
WORKDIR /app
# Add the current directory contents into the container at /app
COPY ./app .
COPY ./requirements.txt .

# Create a Python virtual environment and install the dependencies
RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install flask
# RUN python settings/settings.py
# Run server.py when the container launches
CMD ["python", "server.py"]