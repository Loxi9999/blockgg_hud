cache.player = {
    health = -1,
    armor = 0,
    voice = 25,
    isMale = false,
    isTalking = false
}
cache.player.ped = PlayerPedId()
cache.player.isMale = IsPedMale(cache.player.ped)
cache.player.clientId = PlayerId()
cache.player.serverId = GetPlayerServerId(cache.player.clientId)
local voiceModes = {}

local function mainThread()
    for i = 1, 3 do
        local dist = math.ceil(((i/3) * 100))
        voiceModes[i] = dist
    end

    Wait(3000)
    SendNUIMessage({
        action = 'updateWatermark',
        id = cache.player.serverId
    })

    local accounts = ESX.GetPlayerData('accounts')
    SendNUIMessage({
        action = 'updateWatermark',
        cash = accounts.money
    })
end

local function updatePlayerPed()
    cache.player.ped = PlayerPedId()
    cache.player.isMale = IsPedMale(cache.player.ped)
    cache.player.clientId = PlayerId()
    cache.player.serverId = GetPlayerServerId(cache.player.clientId)
end

--@param key string @ key of data object to attach to data
--@param value string @ value for the key in the data object
local function updateHud(key, val)
    local data = {
        action = 'updateHud'
    }
    data[key] = val
    SendNUIMessage(data)
end

local function playerHudValuesThread()
    Wait(3000)
    while true do
        local health, armor = GetEntityHealth(PlayerPedId()), GetPedArmour(PlayerPedId())
        -- print(armor)
        if (health ~= cache.player.health) then
            updateHud('health', (cache.player.isMale) and health - 100 or health)
            cache.player.health = health
        end

        if (armor ~= cache.player.armor) then
            updateHud('armor', armor)
            cache.player.armor = armor
        end

        local isTalking = MumbleIsPlayerTalking(cache.player.clientId)
        if (isTalking ~= cache.player.isTalking) then
            SendNUIMessage({
                action = 'updateIsTalking',
                isTalking = isTalking
            })
            cache.player.isTalking = isTalking
        end
        Wait(300)
    end
end
-- hud podpierdolony z onlyrp pozdro xd https://github.com/Loxi9999/only-hud
--@param newMode number @ the new talk mode from pma-voice
local function updatePlayerVoice(newMode)
    cache.player.voice = voiceModes[newMode]
    updateHud('voice', cache.player.voice)
end

-- CreateThread(function()
--     repeat Wait(1)
--     until ESX.IsPlayerLoaded()
--     while true do
--         SetRadarZoom(1200)
        
--         Wait(5)
        
--     end
-- end)

--@param account string @ JSON Object from ESX
local function updatePlayerCash(account)
    if (account.name == 'money') then
        SendNUIMessage({
            action = 'updateWatermark',
            cash = account.money
        })
    end
end

CreateThread(mainThread)
RegisterNetEvent('esx:playerPedChanged', updatePlayerPed)
CreateThread(playerHudValuesThread)
AddEventHandler('pma-voice:setTalkingMode', updatePlayerVoice)
RegisterNetEvent('esx:setAccountMoney', updatePlayerCash)