-------------------------------------------------------------------------
-- |                     Controller Dependencies                     | --
-------------------------------------------------------------------------

json = require "json"
stringUtils = require "stringUtils"
fileUtils = require "fileUtils"

-------------------------------------------------------------------------
-- |                      Handler Registration                       | --
-------------------------------------------------------------------------

handlers = {}

-- TODO: move to external lib

function wrap_response(body)
    local responseWrapper = {}
    responseWrapper["success"] = true
    responseWrapper["data"] = body
    return responseWrapper;
end

function ok(body)
    mg.write("HTTP/1.0 200 OK\r\n Content-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n")
    mg.write(json.encode(wrap_response(body)))
end

function register_hanlder(method, handler)
    handlers[method] = handler
end

register_hanlder("GET", function()
    --    TODO: get from env
    local languagesPath = "C:\\devl\\work\\MicroTagMaster\\resources\\languages\\"
    ok(fileUtils.list_files(languagesPath))
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



