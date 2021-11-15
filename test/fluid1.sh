HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="NRjRAarZ1iulf4u4JsFI"
curl -v -X POST -d "{\"consumed\": 1, \"capacity\": 2, \"needed\": 1}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"