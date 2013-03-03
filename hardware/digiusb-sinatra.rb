require 'rubygems'
require 'sinatra'
require "sinatra/reloader"
require 'digiusb'

spark = DigiUSB.sparks.last

get '/' do
  "Hello! Try /lcd/hello, /lcd?text=hello"
end

def show_form(method, text) 
  return "<html><body><form name='input' action='#{method}' method='get'><input type='text' name='text'></form><p/>#{text}</body></html>\n"
end

get '/lcd/?:text?' do
  text = params[:text]
  print spark.puts text
  return show_form('/lcd', text)
end

