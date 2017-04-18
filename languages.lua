-------------------------------------------------------------------------
-- |                     Controller Dependencies                     | --
-------------------------------------------------------------------------

json = require "json"

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

--TODO: strinUtils
function split(str, sep)
    if sep == nil then
        sep = "%s"
    end
    local t = {}; i = 1
    for str in string.gmatch(str, "([^" .. sep .. "]+)") do
        t[i] = str
        i = i + 1
    end
    return t
end

--TODO: fileUtils

function file_listing_to_table(fileListing)
    fileNames = {}
    lines = split(fileListing, "\n")
    for i = 1, #lines do
        lineParts = split(lines[i], " ")
        fileName = lineParts[#lineParts]

        if string.match(fileName, "json") then
            table.insert(fileNames, fileName)
        end
    end

    return fileNames;
end

--TODO: fileUtils
function list_files(dir)
    local languageFile = io.popen("dir " .. dir)

    if languageFile then
        return file_listing_to_table(languageFile:read("*a"))
    else
        mg.write("failed to read file")
    end
end

register_hanlder("GET", function()
    --    TODO: get from env
    local languagesPath = "C:\\devl\\work\\MicroTagMaster\\resources\\languages\\"
    ok(list_files(languagesPath))
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



