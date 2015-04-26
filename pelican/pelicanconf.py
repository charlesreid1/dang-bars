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

# stacked bar chart
TEMPLATE_PAGES['stackedbar.html']          = 'first/stackedbar.html'
TEMPLATE_PAGES['stackedbar.css']           = 'first/stackedbar.css'
TEMPLATE_PAGES['stackedbar_modcontrol.js'] = 'first/stackedbar_modcontrol.js'
TEMPLATE_PAGES['stackedbar_directives.js'] = 'first/stackedbar_directives.js'

# stacked bar chart
TEMPLATE_PAGES['sortablestackedbar.html']          = 'first/sortablestackedbar.html'
TEMPLATE_PAGES['sortablestackedbar.css']           = 'first/sortablestackedbar.css'
TEMPLATE_PAGES['sortablestackedbar_modcontrol.js'] = 'first/sortablestackedbar_modcontrol.js'
TEMPLATE_PAGES['sortablestackedbar_directives.js'] = 'first/sortablestackedbar_directives.js'

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
