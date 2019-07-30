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


import classification.parser as parser

parser.loadUsersData()
parser.parseAlThread()


# Create your views here.
def index(request):
    members = parser._getMembers()
    return django.http.JsonResponse(members, safe=False)

@csrf_exempt
def upload(request: WSGIRequest):
    pngbytes = request.body
    stream = io.BytesIO(pngbytes)
    image = Image.open(stream)

    image = np.array(image)
    descriptor = neural_network.process(image)

    idmin = 0
    distmin = 100000
    for id, desc in parser.users_data.items():
        desc = np.float32(desc)
        descriptor = np.float32(descriptor)
        dist = np.average(np.square(desc - descriptor))
        print(dist)
        if dist < distmin:
            distmin = dist
            idmin = id

    return django.http.HttpResponse(str(idmin))

def _writeToJSONFile(descriptor):
    fileName = 'usersData'
    path = './'
    data = {'descriptor': [str(item) for item in descriptor]}
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)
        return
