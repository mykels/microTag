-------------------------------------------------------------------------
-- |                     Controller Dependencies                     | --
-------------------------------------------------------------------------

json = require "json"

-------------------------------------------------------------------------
-- |                      Handler Registration                       | --
-------------------------------------------------------------------------

handlers = {}

function register_hanlder(method, handler)
    handlers[method] = handler
end

register_hanlder("GET", function()
    --    TODO: get from env
    local translationFileName = string.sub(mg.request_info.path_info, 2, #mg.request_info.path_info)
    local languagesPath = "C:\\devl\\work\\MicroTagMaster\\resources\\languages\\"
    local translationPath = languagesPath .. translationFileName .. ".json"
        mg.send_file(translationPath)
end)

register_hanlder("POST", function()
    mg.write("HTTP/1.0 200 OK\r\nContent-Type: application/text\r\n\r\n")
    mg.write("This is POST!");
end)

-------------------------------------------------------------------------
-- |                    Request Management                           | --
-------------------------------------------------------------------------

handler = handlers[mg.request_info.request_method]

if (handler == nil) then
    mg.write("HTTP/1.0 400 OK\r\nContent-Type: application/text\r\n\r\n")
    mg.write("Method " .. mg.request_info.request_method .. " is not supported for this controller");
else
    handlers[mg.request_info.request_method]()
end



