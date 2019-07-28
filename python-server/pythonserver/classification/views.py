# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from typing import Optional, Any

import django.http
import vk
from django.core.handlers.wsgi import WSGIRequest
from django.views.decorators.csrf import csrf_exempt
from vk import API
import numpy as np
import io
import json

from PIL import Image

import classification.neural_network as neural_network

access_token = "a200e50fa200e50fa200e50fcca26b4f8eaa200a200e50fff2ab5df225a2a99b8efefb3"
session = vk.Session(access_token=access_token)
vk_api: API = vk.API(session, v='5.101')

# Create your views here.
def index(request):
    members = _getMembers()
    return django.http.JsonResponse(members, safe=False)

@csrf_exempt
def upload(request: WSGIRequest):
    pngbytes = request.body
    stream = io.BytesIO(pngbytes)
    image = Image.open(stream)

    image = np.array(image)
    descriptor = neural_network.process(image)

    _writeToJSONFile(descriptor)

    return django.http.HttpResponse(descriptor)

def _getMembers(group_id='lanatsummerschool'):
    members = vk_api.groups.getMembers(group_id=group_id)
    return members['items']

def _writeToJSONFile(descriptor):
    fileName = 'usersData'
    path = './'
    data = {'descriptor': [str(item) for item in descriptor]}
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)
        # data['key'] = 'value'