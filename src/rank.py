#!/usr/bin/env python

import json

with open('result.json') as fp:
    m = json.load(fp)
    f = m['friends']
    f.sort(key=lambda x: x['count'], reverse = True)
    with open('rank.json', 'w') as ff:
        json.dump(f, ff)
