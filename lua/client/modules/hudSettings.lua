cache.settings = {}

--@class NuiCbData
--@field data table @ Table containing data sent from NUI
--@field cb function @ Function that you can call back data to NUI

local function openModal()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'showModal'
    })
end

--@param data,cb
--@see NuiCbData
local function hideModal(data,cb)
    SetNuiFocus(false, false)
    cb('ok')
end
local forceUpdate = false
local function startMinimapThread()
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Citizen.Wait(0)
    SetRadarBigmapEnabled(false, false)
    while true do
        if (cache.settings.hudmode ~= 'gtaHud') then
            BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
        end
        if (forceUpdate) then
            SetRadarBigmapEnabled(true, false)
            Citizen.Wait(0)
            SetRadarBigmapEnabled(false, false)
            forceUpdate = false
        end
        SetRadarZoom(1200)
        Wait(2500)
    end
end
CreateThread(startMinimapThread)

--@param data,cb
--@see NuiCbData
local function receiveHudUpdate(data, cb)
    cache.settings[data.setting] = data.value
    TriggerEvent('icon-hud:receiveSettings', cache.settings)
    if (data.setting == 'hudmode') then
        forceUpdate = true
        if (data.value ~= 'gtaHud' and not cache.player.vehicleManager.inVehicle) then
            DisplayRadar(false)
        elseif (data.value == 'gtaHud') then
            DisplayRadar(true)
        end
    end
    cb('OK')
end
-- hud podpierdolony z onlyrp pozdro xd https://github.com/Loxi9999/only-hud
RegisterCommand('hudsettings', openModal, false)
RegisterNUICallback('settings/hideModal', hideModal)
RegisterNUICallback('settings/sendHudUpdate', receiveHudUpdate)