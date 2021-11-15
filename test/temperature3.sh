HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="DzV8P2RnMtmW9KMF0z2A"
curl -v -X POST -d "{\"temperature\": $1, \"humidity\": $2, \"locationX\": "1", \"locationY\": "2"}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"