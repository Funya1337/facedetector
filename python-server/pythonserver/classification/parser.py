import json
import sys
from io import BytesIO
from threading import Thread

import requests
import vk
from PIL import Image
from vk import API
import numpy as np

import classification.neural_network as neural_network

access_token = "a200e50fa200e50fa200e50fcca26b4f8eaa200a200e50fff2ab5df225a2a99b8efefb3"
session = vk.Session(access_token=access_token)
vk_api: API = vk.API(session, v='5.101')


users_data = {}

def loadUsersData():
    global users_data
    try:
        with open("users.json", "rt") as f:
            users_data = json.load(f)
    except:
        users_data = {}

def saveUsersData():
    with open("users.json", "wt") as f:
        json.dump(users_data, f, indent=2)

def _getMembers(group_id='lanatsummerschool'):
    members = vk_api.groups.getMembers(group_id=group_id)
    return members['items']

def getPhotos(user_ids):
    user_data = vk_api.users.get(user_ids=user_ids, fields="photo_200")
    photos = list(map(lambda user: user["photo_200"] if "photo_200" in user else None, user_data))
    return photos

def downloadPhoto(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img = np.array(img)
    return img

def saveUserDescriptor(user, descriptor):
    users_data[user] = descriptor

progress = 0
all_len = 0
def processUsers(user_ids, photos):
    global progress
    for user, photo in zip(user_ids, photos):
        sys.stdout.write("\rProcessing users... {} / {}".format(progress, all_len))
        sys.stdout.flush()
        progress += 1
        if photo is None:
            continue
        photo = downloadPhoto(photo)
        descriptor = neural_network.process(photo)
        if descriptor is None:
            continue
        descriptor = [str(item) for item in descriptor]
        saveUserDescriptor(user, descriptor)

def batch(iterable, n=1):
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]

def parseAllUsers(group_ids=["lanatsummerschool"]):
    global progress
    global all_len

    loadUsersData()
    neural_network.init()

    for group in group_ids:
        users = _getMembers(group)
        progress = 0
        all_len = len(users)
        for users_batch in batch(users, 10):
            photos = getPhotos(users_batch)
            processUsers(users_batch, photos)
            saveUsersData()

def parseAlThread():
    thr = Thread(target=parseAllUsers)
    thr.start()