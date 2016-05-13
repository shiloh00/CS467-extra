#!/usr/bin/env python

import urllib2
import json

ROOT = 'https://graph.facebook.com/'
ACCESS_TOKEN = "ACCESS_TOKEN"

def request_url(url):
    print url
    res = urllib2.urlopen(url).read()
    #print res
    return res

def request_fb(cmd, args):
    ql = 'limit=999&access_token=' + ACCESS_TOKEN
    if len(args) > 0:
        ql = args + '&' + ql
    url = ROOT + cmd + '?' + ql
    return json.loads(request_url(url))

def request_list(cmd, args):
    res = request_fb(cmd, args)
    data = res['data']
    while 'paging' in res and 'next' in res['paging']:
        res = json.loads(request_url(res['paging']['next']))
        data.extend(res['data'])
    return data

def get_feed_id():
    res = []
    data = request_list('me/feed', '')
    for item in data:
        res.append(item['id'])
    return res

def user_pic(user_id):
    res = request_fb(user_id + '/picture', 'redirect=false&height=600&width=600')
    img = request_url(res['data']['url'])
    with open('../img/' + user_id, 'w') as fp:
        fp.write(img)

def build_friends():
    m = {}
    me = request_fb('me', '')
    m['name'] = me['name']
    m['id'] = me['id']
    user_pic(me['id'])
    m['friends'] = {}
    feeds = get_feed_id()
    for feed in feeds:
        feed_res = request_list(feed + '/likes', '')
        for like in feed_res:
            if m['id'] == like['id']:
                continue
            try:
                m['friends'][like['id']]['count'] += 1
            except KeyError:
                m['friends'][like['id']] = {'id': like['id'], 'text': like['name'], 'count': 1}
                user_pic(like['id'])
    m['friends'] = m['friends'].values()
    m['friends'].sort(key=lambda x: x['count'], reverse=True)
    return m


#print request_fb('me', '')
#print get_feed_id()
with open('result.json', 'w') as fp:
    m = build_friends()
    json.dump(m, fp)
