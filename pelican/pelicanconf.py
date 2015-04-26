#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import re
import os


SITEURL = ''
AUTHOR = u'charlesreid1'
SITENAME = u'dang-bars'
#SITEURL = '/dang-bars'

PATH = 'content'
TIMEZONE = 'America/Los_Angeles'
DEFAULT_LANG = u'en'

# the theme 
THEME = 'simple-angular'

# template locations 
EXTRA_TEMPLATES_PATHS = ['angular',
                         'angular/first',
                         'angular/double']

# template files 
TEMPLATE_PAGES = {}

# our custom index page
TEMPLATE_PAGES['index.html'] = 'index.html'

# hello angular world
TEMPLATE_PAGES['hello.html'] = 'hello/index.html'


# first charts

# simple bar chart
TEMPLATE_PAGES['simplebar.html']          = 'first/simplebar.html'
TEMPLATE_PAGES['simplebar.css']           = 'first/simplebar.css'
TEMPLATE_PAGES['simplebar_modcontrol.js'] = 'first/simplebar_modcontrol.js'
TEMPLATE_PAGES['simplebar_directives.js'] = 'first/simplebar_directives.js'

# multi bar chart
TEMPLATE_PAGES['multibar.html']          = 'first/multibar.html'
TEMPLATE_PAGES['multibar.css']           = 'first/multibar.css'
TEMPLATE_PAGES['multibar_modcontrol.js'] = 'first/multibar_modcontrol.js'
TEMPLATE_PAGES['multibar_directives.js'] = 'first/multibar_directives.js'

# sortable multi bar chart
TEMPLATE_PAGES['sortablemultibar.html']          = 'first/sortablemultibar.html'
TEMPLATE_PAGES['sortablemultibar.css']           = 'first/sortablemultibar.css'
TEMPLATE_PAGES['sortablemultibar_modcontrol.js'] = 'first/sortablemultibar_modcontrol.js'
TEMPLATE_PAGES['sortablemultibar_directives.js'] = 'first/sortablemultibar_directives.js'

# double bar chart
TEMPLATE_PAGES['doublebar.html']          = 'double/doublebar.html'
TEMPLATE_PAGES['doublebar.css']           = 'double/doublebar.css'
TEMPLATE_PAGES['doublebar_modcontrol.js'] = 'double/doublebar_modcontrol.js'
TEMPLATE_PAGES['doublebar_directives.js'] = 'double/doublebar_directives.js'





# --------------8<---------------------

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
