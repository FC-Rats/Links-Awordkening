echo WOOFERSCRIPT
echo By BlitzWoof!
echo Linkawordkening Startup
echo ---
echo Starting Apache stuff...
apache2ctl restart
echo Apache initialized
echo Booting PythonENV
cd /var/www/html/Game/server/
python main.py