# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import django.http
import vk
from vk import API
import json
import requests
from django.shortcuts import render

access_token = "a200e50fa200e50fa200e50fcca26b4f8eaa200a200e50fff2ab5df225a2a99b8efefb3"
session = vk.Session(access_token=access_token)
vk_api: API = vk.API(session, v='5.101')

# Create your views here.
def index(request):
    members = _getMembers()
    return django.http.JsonResponse(members, safe=False)


def _getMembers(group_id='lanatsummerschool'):
    members = vk_api.groups.getMembers(group_id=group_id)
    return members['items']