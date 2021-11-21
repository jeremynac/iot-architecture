HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="oHhMQLoQgc3a4KrG5lVD"
curl -v -X POST -d "{\"temperature\": $1, \"humidity\": $2, \"latitude\": "1", \"longitude\": "2"}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"