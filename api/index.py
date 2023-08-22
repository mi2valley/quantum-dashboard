from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qiskit_ibm_provider import IBMProvider
import xcc
from braket.aws import AwsDevice

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load your IBMQ account
ibm_api_key = os.getenv('IBM_API_KEY')
IBMProvider.save_account(token=ibm_api_key, overwrite=True)
provider = IBMProvider()

refresh_token = os.getenv('XCC_REFRESH_TOKEN')
settings = xcc.Settings(REFRESH_TOKEN=refresh_token)
settings.save()
connection = xcc.Connection.load()


@app.get("/api/status/ibmq")
async def get_queue_status():
    ibmq_status = []

    # provider = IBMProvider(instance="ibm-q/open/main")
    for backend in provider.backends():
        status = backend.status()
        ibmq_status.append({
            "backend_name": backend.name,
            "queue_length": status.pending_jobs,
            "status": str(status.operational)
        })
    
    return {"ibmq_status": ibmq_status}

@app.get("/api/status/ionq")
def get_ionq_queue_status():
    ionq_info = []
    ionq_devices = AwsDevice.get_devices(provider_names=['IonQ'])
    for device in ionq_devices:
        ionq_info.append({
            "backend_name": device.name,
            "status": device.status,
            "type": device.type,
            "provider_name": device.provider_name,
            "arn": device.arn,
            "is_available": device.is_available,
            "properties": device.properties,
            "topology_graph": str(device.topology_graph), # NetworkX graph object
            "frames": device.frames,
            "ports": device.ports
        })
    return {"ionq_info": ionq_info}


@app.get("/api/status/rigetti")
def get_rigetti_queue_status():
    rigetti_info = []
    rigetti_devices = AwsDevice.get_devices(provider_names=['Rigetti'])
    for device in rigetti_devices:
        rigetti_info.append({
            "backend_name": device.name,
            "status": device.status,
            "type": device.type,
            "provider_name": device.provider_name,
            "arn": device.arn,
            "is_available": device.is_available,
            "properties": device.properties,
            "topology_graph": str(device.topology_graph), # NetworkX graph object
            "frames": device.frames,
            "ports": device.ports
        })
    return {"rigetti_info": rigetti_info}

@app.get("/api/status/quera")
def get_quera_queue_status():
    quera_info = []
    quera_devices = AwsDevice.get_devices(provider_names=['QuEra'])
    for device in quera_devices:
        quera_info.append({
            "backend_name": device.name,
            "status": device.status,
            "type": device.type,
            "provider_name": device.provider_name,
            "arn": device.arn,
            "is_available": device.is_available,
            "properties": device.properties,
            "topology_graph": str(device.topology_graph), # NetworkX graph object
            "frames": device.frames,
            "ports": device.ports
        })
    return {"quera_info": quera_info}


@app.get("/api/status/xanadu")
def get_xanadu_devices():
    xanadu_info = []
    devices = xcc.Device.list(connection=connection)

    for device in devices:
        info = {
            "backend_name": device.target,
            "status": device.status,
            "overview": device.overview,
            "certificate": device.certificate,
            "specification": device.specification,
            "expected_uptime": device.expected_uptime,
        }
        xanadu_info.append(info)

    return {"xanadu_info": xanadu_info}
