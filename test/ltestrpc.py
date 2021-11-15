import psutil
import time
import logging
from tb_device_mqtt import TBDeviceMqttClient, TBPublishInfo
        
def callback(test1, test2, test3, test4):
    print("test", test1, test2, test3, test4)

client = TBDeviceMqttClient("127.0.0.1", "DzV8P2RnMtmW9KMF0z2A")
client.connect()
print("Ok")
# result = client.publish_data({"status": "on", "intensity": 20}, "v1/devices/me/attributes", 1)
# client.send_rpc_call(method="setStatus", params={"statpythous": "on"}, callback=callback)
result = client.send_telemetry(telemetry={"status": True, "intensity": 20})
# success = result.get() == TBPublishInfo.TB_ERR_SUCCESS
client.disconnect()
# _rpc_call(method="setStatus", params={"status": True}, callback=callback)