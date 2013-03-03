## Track change

A simple Spotify app that displays the current artist and track on an attached LCD screen.

Based on Peter Watts' [Spotify Kitchen Sink demo](https://github.com/ptrwtts/kitchensink) app.

<a href="http://www.flickr.com/photos/rooreynolds/8524941840/" title="Spotify track-change app by Roo Reynolds"><img src="http://farm9.staticflickr.com/8228/8524941840_fa5aa354fd.jpg" width="500" height="375" alt="Spotify track-change app"></a>

### Prepare the Digispark hardware

1. Solder the [Digispark headers](http://digistump.com/wiki/digispark/tutorials/headers) to a Digispark
2. Prepare the [LCD shield kit](http://digistump.com/wiki/digispark/tutorials/lcd) and connect it
3. use the [Digispark Arduino software](http://digistump.com/wiki/digispark/tutorials/connecting) to load the [USB2LCD example](http://digistump.com/wiki/digispark/tutorials/usb2lcd) on to the Digispark with the LCD screen shield connected

### Installation

1. Ensure Ruby 1.9.3 is installed
2. Install required ruby gems, *[sinatra](http://www.sinatrarb.com)*, *[sinatra-contrib](http://www.sinatrarb.com/contrib)* and *[digiusb](http://rubygems.org/gems/digiusb)*, `sudo gem install sinatra sinatra-contrib digiusb`
3. `mkdir ~/Spotify`
4. `cd ~/Spotify`
5. `git clone git://github.com/rooreynolds/track-change.git`
6. `cd track-change/hardware`
7. Start [the Sinatra app](https://github.com/rooreynolds/track-change/blob/master/hardware/digiusb-sinatra.rb) (defaults to port 4567), `ruby digiusb-sinatra.rb` - (Alternatively, if you have a Matrix Orbital LCD display you might prefer [this equivalent app](https://github.com/rooreynolds/matrixorbital_lcd/).)
8. Check you can pass text through to the LCD display, `http://localhost:4567/lcd?text=Hello`

### Execution

1. Sign up for [a developer account on Spotify](http://developer.spotify.com/en/spotify-apps-api/developer-signup/) and ensure your account is [enabled for the Spotify App API](http://developer.spotify.com/technologies/apps/#developer-account)
2. Open [Spotify](https://www.spotify.com/). Check you can see the new *Developer* tab
3. Open the *trackchange* app by searching for `spotify:app:trackchange` in the Spotify search bar
4. Observe that every track change results in the screen being updated
