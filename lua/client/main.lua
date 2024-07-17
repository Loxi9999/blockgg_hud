ESX = nil
TriggerEvent('hypex:getTwojStarySharedTwojaStaraObject', function(ESXObj)
    ESX = ESXObj
end)
cache = {}
local client = {}

client.setupScript = function()
    Wait(1000)
    SendNUIMessage({
        action = 'setupHud'
    })

end

RegisterNetEvent('esx:playerLoaded', client.setupScript)
CreateThread(client.setupScript)