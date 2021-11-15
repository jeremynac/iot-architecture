HOST_NAME="http://localhost:8080"
ACCESS_TOKEN="kg0LKrIE2zr3DDkelHVp"
curl -v -X POST -d "{\"consumed\": 3, \"capacity\": 6, \"needed\": 3}" http://localhost:8080/api/v1/$ACCESS_TOKEN/telemetry --header "Content-Type:application/json"