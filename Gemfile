source "https://rubygems.org"

gem "rake"
gem "html-proofer"
gem "rb-fsevent", "0.9.8"
gem "redcarpet"
group :jekyll_plugins do
      gem 'jekyll-livereload'
end

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
