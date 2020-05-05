# README
the rests manager

-------------
to install old ruby (1.9.3) to a new system, you need to use 
custom openssl library:
Hi, I had a similar problem with LM 19 Tara edition. This solution helped me:

$ rvm pkg install openssl
$ rvm remove x.x.x
$ rvm install x.x.x -C --with-openssl-dir=$HOME/.rvm/usr

------------
to install old ruby (<2) you should use rvm <= 1.29.7
For those experiencing this issue, there are a couple of workarounds..

You can run: rvm get 1.29.7 to downgrade rvm to 1.29.7, which will allow you to successfully install pre 2.0 rubies.

Alternatively (and this is something I had to do as my current automation doesn't seem to allow me to downgrade rvm easily..) you install the ruby version (which will "fail" but the ruby binaries etc will still be there), tell rvm to install an older version of rubygems and then run a repair.. There may be unexpected side-effects to this though.
E.g.

rvm install 1.9.3
rvm use 1.9.3
rvm rubygems 2.7.9
rvm repair all
Hope this helps!
--------------
