import logging
# Importing models and REST client class from Community Edition version
from tb_rest_client.rest_client_ce import *
# Importing the API exception
from tb_rest_client.rest import ApiException

LIGHT_SENSOR_1_NAME = "light_sensor_1"
LIGHT_SENSOR_2_NAME = "light_sensor_2"
LIGHT_SENSOR_3_NAME = "light_sensor_3"

TEMPERATURE_AND_HUMIDITY_SENSOR_1_NAME = "temperature_adn_humidity_sensor_1"
TEMPERATURE_AND_HUMIDITY_SENSOR_2_NAME = "temperature_adn_humidity_sensor_2"
TEMPERATURE_AND_HUMIDITY_SENSOR_3_NAME = "temperature_adn_humidity_sensor_3"

FLUID_SENSOR_1_NAME = "fluid_sensor_1"
FLUID_SENSOR_2_NAME = "fluid_sensor_2"
FLUID_SENSOR_3_NAME = "fluid_sensor_3"




logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(module)s - %(lineno)d - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

# ThingsBoard REST API URL
url = "http://localhost:8080"
# Default Tenant Administrator credentials
username = "tenant@thingsboard.org"
password = "tenant"

def register_light_sensors(rest_client: RestClientCE):
    light_sensor_1 = Device(name=LIGHT_SENSOR_1_NAME, type="light_sensor")
    light_sensor_1 = rest_client.save_device(light_sensor_1)
    
    light_sensor_2 = Device(name=LIGHT_SENSOR_2_NAME, type="light_sensor")
    light_sensor_2 = rest_client.save_device(light_sensor_2)
    
    light_sensor_3 = Device(name=LIGHT_SENSOR_3_NAME, type="light_sensor")
    light_sensor_3 = rest_client.save_device(light_sensor_3)
    
def register_temperature_and_humidity_sensors(rest_client: RestClientCE):
    temperature_and_humidity_sensor_1 = Device(name=LIGHT_SENSOR_1_NAME, type="thermometer")
    temperature_and_humidity_sensor_1 = rest_client.save_device(temperature_and_humidity_sensor_1)
     
    temperature_and_humidity_sensor_2 = Device(name=TEMPERATURE_AND_HUMIDITY_SENSOR_2_NAME, type="light_sensor")
    temperature_and_humidity_sensor_2 = rest_client.save_device(temperature_and_humidity_sensor_2)
    
    temperature_and_humidity_sensor_3 = Device(name=TEMPERATURE_AND_HUMIDITY_SENSOR_3_NAME, type="light_sensor")
    temperature_and_humidity_sensor_3 = rest_client.save_device(temperature_and_humidity_sensor_3)
    
def register_fluid_sensors(rest_client: RestClientCE):
    fluid_sensor_1 = Device(name=FLUID_SENSOR_1_NAME, type="light_sensor")
    fluid_sensor_1 = rest_client.save_device(fluid_sensor_1)
    
    fluid_sensor_2 = Device(name=FLUID_SENSOR_2_NAME, type="light_sensor")
    fluid_sensor_2 = rest_client.save_device(fluid_sensor_2)
    
    fluid_sensor_3 = Device(name=FLUID_SENSOR_3_NAME, type="light_sensor")
    fluid_sensor_3 = rest_client.save_device(fluid_sensor_3)
    
def initialize_light_sensor_profile(rest_client: RestClientCE):
    light_rule_chain = RuleChain()
    device_profile = DeviceProfile()
    
with RestClientCE(base_url=url) as rest_client:
    try:
        # Auth with credentials
        rest_client.login(username=username, password=password)

        # Creating an Asset
        asset = Asset(name="Building 1houhihj", type="building")
        asset = rest_client.save_asset(asset)

        logging.info("Asset was created:\n%r\n", asset)

        # creating a Device
        device = Device(name="Thermometer 13hguohoh", type="thermometer")
        device = rest_client.save_device(device)

        logging.info(" Device was created:\n%r\n", device)

        # Creating relations from device to asset
        relation = EntityRelation(_from=asset.id, to=device.id, type="Contains")
        relation = rest_client.save_relation(relation)

        logging.info(" Relation was created:\n%r\n", relation)
    except ApiException as e:
        logging.exception(e)
    

