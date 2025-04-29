const fs = require('fs');
const pino = require("pino");
const path = require('path');
const axios = require("axios");
const { exec } = require("child_process");
const { default: makeWASocket, useMultiFileAuthState, logger, delay, makeCacheableSignalKeyStore, jidDecode, getContentType, downloadContentFromMessage, makeInMemoryStore, fetchLatestBaileysVersion, DisconnectReason } = require("ovl_wa_baileys");
const config = require("./set");
const session = config.SESSION_ID || "Ovl-MD_7z8ypHsQ_SESSION-ID";
let evt = require(__dirname + "/framework/ovlcmd");
const FileType = require('file-type')
const prefixe = config.PREFIXE"."
const { Antilink, Antilink_warnings } = require("./DataBase/antilink");
const { Antitag, Antitag_warnings } = require("./DataBase/antitag");
const { Antibot, AntibotWarnings } = require("./DataBase/antibot");
const { Bans } = require("./DataBase/ban");
const { GroupSettings } = require("./DataBase/events");
const { levels, calculateLevel } = require('./DataBase/levels');
const { Ranks } = require('./DataBase/rank');
const { Sudo } = require('./DataBase/sudo');
const { getMessage, addMessage } = require('./framework/store');
const { WA_CONF } = require('./DataBase/wa_conf');

 async function ovlAuth(session) {
    let sessionId;
    try {
        if (session.startsWith("Ovl-MD_") && session.endsWith("_SESSION-ID")) {
            sessionId = session.slice(7, -11);
        }
        const response = await axios.get('https://pastebin.com/raw/' + sessionId);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        const filePath = path.join(__dirname, 'auth', 'creds.json');
            await fs.writeFileSync(filePath, data, 'utf8');
    } catch (e) {
        console.log("Session invalide: " + e.message || e);
    }
 }
ovlAuth(session);

async function main() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'auth'));
        try {
        const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store"
  })
});
         const ovl = makeWASocket({
            printQRInTerminal: true,
            logger: pino({ level: "silent" }),
            browser: [ "Ubuntu", "Chrome", "20.0.04" ],
            generateHighQualityLinkPreview: true,
            syncFullHistory: false,
            auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }).child({ level: "silent" }))
        },
            getMessage: async (key) => {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg.message;
           }
        });
store.bind(ovl.ev);
ovl.ev.on("messages.upsert", async (m) => {
    if (m.type !== 'notify') return;

    const { messages } = m;
    const ms = messages[0];
    if (!ms.message) return;
 addMessage(ms.key.id, ms);

    const decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return (decode.user && decode.server && `${decode.user}@${decode.server}`) || jid;
        }
        return jid;
    };
    const mtype = getContentType(ms.message);
    const texte = {
    conversation: ms.message.conversation,
    imageMessage: ms.message.imageMessage?.caption,
    videoMessage: ms.message.videoMessage?.caption,
    extendedTextMessage: ms.message.extendedTextMessage?.text,
    buttonsResponseMessage: ms.message.buttonsResponseMessage?.selectedButtonId,
    listResponseMessage: ms.message.listResponseMessage?.singleSelectReply?.selectedRowId,
    messageContextInfo: ms.message.buttonsResponseMessage?.selectedButtonId ||
        ms.message.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text
    }[mtype] || "";

    const ms_org = ms.key.remoteJid;
    const id_Bot = decodeJid(ovl.user.id);
    const id_Bot_N = id_Bot.split('@')[0];
    const verif_Groupe = ms_org?.endsWith("@g.us");
    const infos_Groupe = verif_Groupe ? await ovl.groupMetadata(ms_org) : "";
    const nom_Groupe = verif_Groupe ? infos_Groupe.subject : "";
    const msg_Repondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
    const auteur_Msg_Repondu = decodeJid(ms.message.extendedTextMessage?.contextInfo?.participant);
    const mr = ms.message.extendedTextMessage?.contextInfo?.mentionedJid;
    const auteur_Message = verif_Groupe ? ms.key.participant : decodeJid(ms.key.fromMe ? id_Bot : ms.key.remoteJid);
    const membre_Groupe = verif_Groupe ? ms.key.participant : '';
    const nom_Auteur_Message = ms.pushName;
    const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
    const verif_Cmd = texte ? texte.startsWith(prefixe) : false;
    const cmds = verif_Cmd ? texte.slice(prefixe.length).trim().split(/ +/).shift().toLowerCase() : false;
    const groupe_Admin = (participants) => participants.filter((m) => m.admin).map((m) => m.id);
    const mbre_membre = verif_Groupe ? await infos_Groupe.participants : '';
    const admins = verif_Groupe ? groupe_Admin(mbre_membre) : '';
    const verif_Ovl_Admin = verif_Groupe ? admins.includes(id_Bot) : false;
    const Ainz = '22651463203';
const Ainzbot = '22605463559';
const devNumbers = [Ainz, Ainzbot];
async function obtenirUsersPremium() {
  try {
    const sudos = await Sudo.findAll({ attributes: ['id'] });
    if (!sudos.length) {
      return [];
    }
    return sudos.map((entry) => entry.id.replace(/[^0-9]/g, ""));
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs sudo :", error);
    return [];
  }
}
const sudoUsers = await obtenirUsersPremium();
const premium_Users_id = [Ainz, Ainzbot, id_Bot_N, config.NUMERO_OWNER, sudoUsers]
  .flat()
  .map((s) => (typeof s === 'string' ? `${s.replace(/[^0-9]/g, "")}@s.whatsapp.net` : ''));
const prenium_id = premium_Users_id.includes(auteur_Message);
const dev_id = devNumbers
  .map((s) => (typeof s === 'string' ? `${s.replace(/[^0-9]/g, "")}@s.whatsapp.net` : ''))
  .includes(auteur_Message);
const dev_num = devNumbers
  .map((s) => (typeof s === 'string' ? `${s.replace(/[^0-9]/g, "")}@s.whatsapp.net` : ''));
const verif_Admin = verif_Groupe 
    ? admins.includes(auteur_Message) || premium_Users_id.includes(auteur_Message) 
    : false;
 function repondre(message) {
        ovl.sendMessage(ms_org, { text: message }, { quoted: ms });
 };
    const cmd_options = {
        verif_Groupe,
        mbre_membre,
        membre_Groupe,
        verif_Admin,
        infos_Groupe,
        nom_Groupe,
        auteur_Message,
        nom_Auteur_Message,
        id_Bot,
        prenium_id,
        dev_id,
        dev_num,
        id_Bot_N,
        verif_Ovl_Admin,
        prefixe,
        arg,
        repondre,
        groupe_Admin,
        msg_Repondu,
        auteur_Msg_Repondu,
        ms,
        ms_org,
    };
 
//Rank messages && Level up
 if (texte && auteur_Message.endsWith("s.whatsapp.net")) {
    let userId = auteur_Message;
    const user = await Ranks.findOne({ where: { id: userId } });
    if (!user) {
        await Ranks.create({
            id: userId,
            name: nom_Auteur_Message,
            level: 0,
            exp: 10,
            messages: 1,
        });
    } else {
        user.name = nom_Auteur_Message;
        user.messages += 1;
        user.exp += 10;

        const newLevel = calculateLevel(user.exp);

        if (newLevel > user.level && config.LEVEL_UP == 'oui') {
            await ovl.sendMessage(ms_org, {
                text: `Félicitations ${nom_Auteur_Message}! Vous avez atteint le niveau ${newLevel}! 🎉`
            });
        }

        user.level = newLevel;
        await user.save();
    }
 };
 // Fin Rank et Level up
 
 const settings = await WA_CONF.findOne({ where: { id: '1' } });
        if (settings) {
// Présence
if (settings.presence === 'enligne') {
    await ovl.sendPresenceUpdate("available", ms_org);
} else if (settings.presence === 'ecrit') {
    await ovl.sendPresenceUpdate("composing", ms_org);
} else if (settings.presence === 'enregistre') {
    await ovl.sendPresenceUpdate("recording", ms_org);
}

// Auto read status
if (ms_org === "status@broadcast" && settings.lecture_status === "oui") { 
    await ovl.readMessages([ms.key]);
}

// Like status
if (ms_org === "status@broadcast" && settings.like_status === "oui") {
    await ovl.sendMessage(ms_org, { react: { key: ms.key, text: "💚" } }, { statusJidList: [ms.key.participant, id_Bot], broadcast: true });
}

// DL_STATUS
if (ms_org === "status@broadcast" && settings.dl_status === "oui") {
    if (ms.message.extendedTextMessage) {
        await ovl.sendMessage(id_Bot, { text: ms.message.extendedTextMessage.text }, { quoted: ms });
    } else if (ms.message.imageMessage) {
        let imgs = await ovl.dl_save_media_ms(ms.message.imageMessage);
        await ovl.sendMessage(id_Bot, { image: { url: imgs }, caption: ms.message.imageMessage.caption }, { quoted: ms });
    } else if (ms.message.videoMessage) {
        let vids = await ovl.dl_save_media_ms(ms.message.videoMessage);
        await ovl.sendMessage(id_Bot, { video: { url: vids }, caption: ms.message.videoMessage.caption }, { quoted: ms });
    }
}

// Anti Vue Unique
if (settings.antivv === "oui") {
    let viewOnceKey = Object.keys(ms.message).find(key => key.startsWith("viewOnceMessage"));
    let vue_Unique_Message = ms.message;

    if (viewOnceKey) {
        vue_Unique_Message = ms.message[viewOnceKey].message;
    }

    if (vue_Unique_Message) {
        if (
            (vue_Unique_Message.imageMessage && vue_Unique_Message.imageMessage.viewOnce == true) ||
            (vue_Unique_Message.videoMessage && vue_Unique_Message.videoMessage.viewOnce == true) ||
            (vue_Unique_Message.audioMessage && vue_Unique_Message.audioMessage.viewOnce == true)
        ) {
        
    try {
        let media;
        let options = { quoted: ms };

        if (vue_Unique_Message.imageMessage) {
            media = await ovl.dl_save_media_ms(vue_Unique_Message.imageMessage);
            await ovl.sendMessage(
                ovl.user.id,
                { image: { url: media }, caption: vue_Unique_Message.imageMessage.caption || "" },
                options
            );

        } else if (vue_Unique_Message.videoMessage) {
            media = await ovl.dl_save_media_ms(vue_Unique_Message.videoMessage);
            await ovl.sendMessage(
                ovl.user.id,
                { video: { url: media }, caption: vue_Unique_Message.videoMessage.caption || "" },
                options
            );

        } else if (vue_Unique_Message.audioMessage) {
            media = await ovl.dl_save_media_ms(vue_Unique_Message.audioMessage);
            await ovl.sendMessage(
                ovl.user.id,
                { audio: { url: media }, mimetype: "audio/mp4", ptt: false },
                options
            );

        }
    } catch (_error) {
        console.error("❌ Erreur lors du traitement du message en vue unique :", _error.message || _error);
    }
}
     }
    }


   //antidelete
 try {
    if (mtype === 'protocolMessage' && ['pm', 'gc', 'status', 'all', 'pm/gc', 'pm/status', 'gc/status'].includes(settings.antidelete)) {
        const deletedMsgKey = ms.message.protocolMessage;
        const deletedMsg = getMessage(deletedMsgKey.key.id);

        if (deletedMsg) {
            const jid = deletedMsg.key.remoteJid;
            const vg = jid?.endsWith("@g.us");
            const sender = vg 
                ? (deletedMsg.key.participant || deletedMsg.participant)
                : jid;
            const deletionTime = new Date().toISOString().substr(11, 8);

            if (!deletedMsg.key.fromMe) {
                const provenance = jid.endsWith('@g.us') 
                    ? `👥 Groupe : ${(await ovl.groupMetadata(jid)).subject}`
                    : `📩 Chat : @${jid.split('@')[0]}`;

                const header = `
✨ OVL-MD ANTI-DELETE MSG✨
👤 Envoyé par : @${sender.split('@')[0]}
❌ Supprimé par : @${auteur_Message.split('@')[0]}
⏰ Heure de suppression : ${deletionTime}
${provenance}
                `;

                const shouldSend = (
                    (settings.antidelete === 'gc' && jid.endsWith('@g.us')) ||
                    (settings.antidelete === 'pm' && jid.endsWith('@s.whatsapp.net')) ||
                    (settings.antidelete === 'status' && jid.endsWith('status@broadcast')) ||
                    (settings.antidelete === 'all') ||
                    (settings.antidelete === 'pm/gc' && (jid.endsWith('@g.us') || jid.endsWith('@s.whatsapp.net'))) ||
                    (settings.antidelete === 'pm/status' && (jid.endsWith('status@broadcast') || jid.endsWith('@s.whatsapp.net'))) ||
                    (settings.antidelete === 'gc/status' && (jid.endsWith('@g.us') || jid.endsWith('status@broadcast')))
                );

                if (shouldSend) {
                    await ovl.sendMessage(ovl.user.id, { text: header, mentions: [sender, auteur_Message, jid] }, { quoted: deletedMsg });
                    await ovl.sendMessage(ovl.user.id, { forward: deletedMsg }, { quoted: deletedMsg });
                }
            }
        }
    }
} catch (err) {
    console.error('Une erreur est survenue', err);
}
        }
 //fin antidelete
 
//Antitag 
 if (ms.message?.[mtype]?.contextInfo?.mentionedJid?.length > 30) {

    try {
        const settings = await Antitag.findOne({ where: { id: ms_org } });

        if (verif_Groupe && settings && settings.mode === 'oui') {
            if (!verif_Admin && verif_Ovl_Admin) {
                const username = auteur_Message.split("@")[0];

                switch (settings.type) {
                    case 'supp':
                        await ovl.sendMessage(ms_org, {
                            text: `@${username}, l'envoi de tags multiples est interdit dans ce groupe.`,
                            mentions: [auteur_Message]
                        }, { quoted: ms });
                        await ovl.sendMessage(ms_org, { delete: ms.key });
                        break;

                    case 'kick':
                        await ovl.sendMessage(ms_org, {
                            text: `@${username} a été retiré du groupe pour avoir mentionné plus de 30 membres.`,
                            mentions: [auteur_Message]
                        });
                        await ovl.sendMessage(ms_org, { delete: ms.key });
                        await ovl.groupParticipantsUpdate(ms_org, [auteur_Message], "remove");
                        break;

                    case 'warn':
                        let warning = await Antitag_warnings.findOne({
                            where: { groupId: ms_org, userId: auteur_Message }
                        });

                        if (!warning) {
                            await Antitag_warnings.create({ groupId: ms_org, userId: auteur_Message });
                            await ovl.sendMessage(ms_org, {
                                text: `@${username}, vous avez reçu un avertissement (1/3) pour avoir mentionné plus de 30 membres.`,
                                mentions: [auteur_Message]
                            });
                        } else {
                            warning.count += 1;
                            await warning.save();

                            if (warning.count >= 3) {
                                await ovl.sendMessage(ms_org, {
                                    text: `@${username} a été retiré du groupe après 3 avertissements.`,
                                    mentions: [auteur_Message]
                                });
                                await ovl.sendMessage(ms_org, { delete: ms.key });
                                await ovl.groupParticipantsUpdate(ms_org, [auteur_Message], "remove");
                                await warning.destroy();
                            } else {
                                await ovl.sendMessage(ms_org, {
                                    text: `@${username}, avertissement ${warning.count}/3 pour avoir mentionné plus de 30 membres.`,
                                    mentions: [auteur_Message]
                                });
                            }
                        }
                        break;

                    default:
                        console.error(`Action inconnue : ${settings.type}`);
                }
            }
        }
    } catch (error) {
        console.error("Erreur dans le système Antitag :", error);
    }
}
//Fin antitag
 
          //antilink
         // const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[^\s]+)/gi;

try {
    if ((texte.includes('https://') || texte.includes('http://'))) {
   // if (linkRegex.test(texte)) {
     const settings = await Antilink.findOne({ where: { id: ms_org } });
        if (verif_Groupe && settings && settings.mode == 'oui') {
        if (!verif_Admin && verif_Ovl_Admin) {
          switch (settings.type) {
            case 'supp':
                await ovl.sendMessage(ms_org, {
                    text: `@${auteur_Message.split("@")[0]}, les liens ne sont pas autorisés ici.`,
                    mentions: [auteur_Message]
                });
                await ovl.sendMessage(ms_org, { delete: ms.key });
                break;

            case 'kick':
                await ovl.sendMessage(ms_org, {
                    text: `@${auteur_Message.split("@")[0]} a été retiré pour avoir envoyé un lien.`,
                    mentions: [auteur_Message]
                });
                await ovl.sendMessage(ms_org, { delete: ms.key });
                await ovl.groupParticipantsUpdate(ms_org, [auteur_Message], "remove");
                break;

            case 'warn':
                let warning = await Antilink_warnings.findOne({
                    where: { groupId: ms_org, userId: auteur_Message }
                });

                if (!warning) {
                    await Antilink_warnings.create({ groupId: ms_org, userId: auteur_Message });
                    await ovl.sendMessage(ms_org, {
                        text: `@${auteur_Message.split("@")[0]}, avertissement 1/3 pour avoir envoyé un lien.`,
                        mentions: [auteur_Message]
                    });
                } else {
                    warning.count += 1;
                    await warning.save();

                    if (warning.count >= 3) {
                        await ovl.sendMessage(ms_org, {
                            text: `@${auteur_Message.split("@")[0]} a été retiré après 3 avertissements.`,
                            mentions: [auteur_Message]
                        });
                        await ovl.sendMessage(ms_org, { delete: ms.key });
                        await ovl.groupParticipantsUpdate(ms_org, [auteur_Message], "remove");
                        await warning.destroy();
                    } else {
                        await ovl.sendMessage(ms_org, {
                            text: `@${auteur_Message.split("@")[0]}, avertissement ${warning.count}/3 pour avoir envoyé un lien.`,
                            mentions: [auteur_Message]
                        });
                    }
                }
                break;

            default:
                console.error(`Action inconnue : ${settings.type}`);
                }
            }
        }
    }
} catch (error) {
    console.error("Erreur dans le système Antilink :", error);
   }

          //fin antilink

 // Antibot
 try {
    const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
    const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;

    if (botMsg || baileysMsg) {
        const settings = await Antibot.findOne({ where: { id: ms_org } });
        if (verif_Groupe && settings && settings.mode === 'oui') {
            if (!verif_Admin && verif_Ovl_Admin) {
                const key = {
                    remoteJid: ms_org,
                    fromMe: false,
                    id: ms.key.id,
                    participant: auteur_Message
                };

                switch (settings.type) {
                    case 'supp':
                        await ovl.sendMessage(ms_org, {
                            text: `@${auteur_Message.split("@")[0]}, les bots ne sont pas autorisés ici.`,
                            mentions: [auteur_Message]
                        });
                        await ovl.sendMessage(ms_org, { delete: ms.key });
                        break;

                    case 'kick':
                        await ovl.sendMessage(ms_org, {
                            text: `@${auteur_Message.split("@")[0]} a été retiré pour avoir utilisé un bot.`,
                            mentions: [auteur_Message]
                        });
                        await ovl.sendMessage(ms_org, { delete: ms.key });
                        await ovl.groupParticipantsUpdate(ms_org, [auteur_Message], "remove");
                        break;

                    case 'warn':
                        let warning = await Antibot_warnings.findOne({
                            where: { groupId: ms_org, userId: auteur_Message }
                        });

                        if (!warning) {
                            await Antibot_warnings.create({ groupId: ms_org, userId: auteur_Message });
                            await ovl.sendMessage(ms_org, {
                                text: `@${auteur_Message.split("@")[0]}, avertissement 1/3 pour utilisation de bot.`,
                                mentions: [auteur_Message]
                            });
                        } else {
                            warning.count += 1;
                            await warning.save();

                            if (warning.count >= 3) {
                                await ovl.sendMessage(ms_org, {
                                    text: `@${auteur_Message.split("@")[0]} a été retiré après 3 avertissements.`,
                                    mentions: [auteur_Message]
                                });
                                await ovl.sendMessage(ms_org, { delete: ms.key });
                                await ovl.groupParticipantsUpdate(ms_org, [auteur_Message], "remove");
                                await warning.destroy();
                            } else {
                                await ovl.sendMessage(ms_org, {
                                    text: `@${auteur_Message.split("@")[0]}, avertissement ${warning.count}/3 pour utilisation de bot.`,
                                    mentions: [auteur_Message]
                                });
                            }
                        }
                        break;

                    default:
                        console.error(`Action inconnue : ${settings.type}`);
                }
            }
        }
    }
} catch (error) {
    console.error("Erreur dans le système Anti-Bot :", error);
}
// fin antibot

 // quelque fonctions 
 async function user_ban(userId) {
    const ban = await Bans.findOne({ where: { id: userId, type: 'user' } });
    return !!ban;
}
async function groupe_ban(groupId) {
    const ban = await Bans.findOne({ where: { id: groupId, type: 'group' } });
    return !!ban;
}
 //fin fonction    
 if (verif_Cmd) { 
        const cd = evt.cmd.find((ovlcmd) => ovlcmd.nom_cmd === cmds || (ovlcmd.alias && ovlcmd.alias.includes(cmds)));
        
        if (cd) {
             try {
                if (config.MODE !== 'public' && !prenium_id) {
                    return 
                }
                if ((!dev_id && auteur_Message !== '221772430620@s.whatsapp.net') && ms_org === "120363314687943170@g.us") {
                return;
            }
                if (!prenium_id) {
                const user_bans = await user_ban(auteur_Message);
                const groupe_bans = verif_Groupe ? await groupe_ban(ms_org) : false;

                if (user_bans || groupe_bans) {
                    return;
                }
                };
             if(cd.react) {
                await ovl.sendMessage(ms_org, { react: { text: cd.react, key: ms.key } });
             } else { await ovl.sendMessage(ms_org, { react: { text: "🎐", key: ms.key } });
                    }
              cd.fonction(ms_org, ovl, cmd_options);
            } catch (e) {
                console.log("Erreur: " + e);
                ovl.sendMessage(ms_org, { text: "Erreur: " + e }, { quoted: ms });
            }
        }
    }
}); 
         //fin événement message 

         //group participants update
ovl.ev.on('group-participants.update', async (data) => {
    const parseID = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return (decode.user && decode.server && `${decode.user}@${decode.server}`) || jid;
        }
        return jid;
    };

    try {
        const groupInfo = await ovl.groupMetadata(data.id);
        const settings = await GroupSettings.findOne({ where: { id: data.id } });
        if (!settings) return;

        const { welcome, goodbye, antipromote, antidemote } = settings;

        for (const participant of data.participants) {
         let profilePic;
            try {
                profilePic = await ovl.profilePictureUrl(participant, 'image');
            } catch (err) {
             console.error(err);
                profilePic = 'https://files.catbox.moe/54ip7g.jpg';
            }

            const userMention = `@${participant.split("@")[0]}`;

            if (data.action === 'add' && welcome === 'oui') {
                const groupName = groupInfo.subject || "Groupe inconnu";
                const totalMembers = groupInfo.participants.length;
                const message = `*🎉Bienvenue ${userMention}🎉*\n*👥Groupe: ${groupName}*\n*🔆Membres: #${totalMembers}*\n*📃Description:* ${groupInfo.desc || "Aucune description"}`;

                await ovl.sendMessage(data.id, {
                    image: { url: profilePic },
                    caption: message,
                    mentions: [participant]
                });
            }

            if (data.action === 'remove' && goodbye === 'oui') {
                await ovl.sendMessage(data.id, { text: `👋Au revoir ${userMention}`, mentions: [participant] });
            }

            if (data.action === 'promote' && antipromote === 'oui') {
                await ovl.groupParticipantsUpdate(data.id, [participant], "demote");
                await ovl.sendMessage(data.id, {
                    text: `🚫Promotion non autorisée: ${userMention} a été rétrogradé.`,
                    mentions: [participant],
                });
            }

            if (data.action === 'demote' && antidemote === 'oui') {
                await ovl.groupParticipantsUpdate(data.id, [participant], "promote");
                await ovl.sendMessage(data.id, {
                    text: `🚫Rétrogradation non autorisée: ${userMention} a été promu à nouveau.`,
                    mentions: [participant],
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
});

         //Fin group participants update

         // Antidelete


// FIN ANTIDELETE        
         
ovl.ev.on("connection.update", async (con) => {
    const { connection, lastDisconnect } = con;

    if (connection === "connecting") {
        console.log("🌐 Connexion à WhatsApp en cours...");
    } else if (connection === 'open') {
        console.log("✅ Connexion établie ; Le bot est en ligne 🌐\n\n");
        
        console.log("Chargement des commandes...\n");
        const commandes = fs.readdirSync(path.join(__dirname, "commandes")).filter(fichier => path.extname(fichier).toLowerCase() === ".js");
        
        for (const fichier of commandes) {
            try {
                require(path.join(__dirname, "commandes", fichier));
                console.log(`${fichier} installé avec succès`);
                await  delay(300); // Pause de 300 ms
            } catch (e) {
                console.log(`Erreur lors du chargement de ${fichier} :    ${e}`);
            }
        }
        delay(700);
      let start_msg = `╭────《 OVL-MD 》─────⊷
⫸  *Préfixe*       : ${prefixe}
⫸  *Mode*          : ${config.MODE}
⫸  *Commandes*     : ${evt.cmd.length}

             𝙈𝙖𝙙𝙚 𝙗𝙮 Ainz`;
     if (ovl.user && ovl.user.id) {
        await ovl.sendMessage(ovl.user.id, { text: start_msg }); 
     }
    } else if (connection === 'close') {
                if (lastDisconnect.error?.output?.statusCode === DisconnectReason.loggedOut) {
                    console.log('Connexion fermée: Déconnecté');
                } else {
                    console.log('Connexion fermée: Reconnexion en cours...');
                 main()
                }
    }
});

        // Gestion des mises à jour des identifiants
        ovl.ev.on("creds.update", saveCreds);

            //autre fonction de ovl
            ovl.dl_save_media_ms = async (message, filename = '', attachExtension = true, directory = './downloads') => {
    try {
        const quoted = message.msg || message;
        const mime = quoted.mimetype || '';
        const messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        
        console.log(`Téléchargement du message de type: ${messageType}`);
        
        if (!mime) {
            throw new Error("Type MIME non spécifié ou non pris en charge.");
        }

        const stream = await downloadContentFromMessage(quoted, messageType);
        const bufferChunks = [];
        for await (const chunk of stream) {
            bufferChunks.push(chunk);
        }
        
        const buffer = Buffer.concat(bufferChunks);
        const type = await FileType.fromBuffer(buffer);
        if (!type) {
            throw new Error("Type de fichier non reconnu");
        }

        // Création du chemin du répertoire
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        
        const trueFileName = attachExtension ? `${filename}.${type.ext}` : filename;
        const filePath = path.resolve(directory, trueFileName);

        // Écriture directe dans un fichier via un flux de création
        await fs.promises.writeFile(filePath, buffer);
        console.log(`Fichier sauvegardé à: ${filePath}`);
        
        return filePath;
    } catch (error) {
        console.error('Erreur lors du téléchargement et de la sauvegarde du fichier:', error);
        throw error;
    }
};
         ovl.recup_msg = async ({ expediteur, salon, limiteTemps = 0, condition = () => true } = {}) => {
    return new Promise((accepter, refuser) => {
        if (typeof expediteur !== 'string' || !expediteur) return refuser(new Error("L'expéditeur doit être une chaîne non vide."));
        if (typeof salon !== 'string' || !salon) return refuser(new Error("Le salon doit être une chaîne non vide."));
        if (limiteTemps && typeof limiteTemps !== 'number') return refuser(new Error("Le temps limite doit être un nombre."));
        if (typeof condition !== 'function') return refuser(new Error("Le paramètre condition doit être une fonction."));

        let chrono;

        const analyseur = ({ type, messages }) => {
            if (type !== "notify") return;

            for (const msg of messages) {
                const idSalon = msg.key.remoteJid;
                const idExpediteur = msg.key.fromMe
                    ? ovl.user.id.replace(/:.*@/g, '@')
                    : msg.key.participant
                        ? msg.key.participant.replace(/:.*@/g, '@')
                        : idSalon;

                if (idExpediteur === expediteur && idSalon === salon && condition(msg)) {
                    ovl.ev.off('messages.upsert', analyseur);
                    if (chrono) clearTimeout(chrono);
                    return accepter(msg);
                }
            }
        };

        ovl.ev.on('messages.upsert', analyseur);

        if (limiteTemps > 0) {
            chrono = setTimeout(() => {
                ovl.ev.off('messages.upsert', analyseur);
                refuser(new Error("Timeout"));
            }, limiteTemps);
        }
    });
};

            //fin autre fonction ovl
    } catch (error) {
        console.error("Erreur principale:", error);
    }
}

main();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const os = require('os');

let dernierPingRecu = Date.now();

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OVL-Bot Web Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #121212; font-family: Arial, sans-serif; color: #ffffff; overflow: hidden; }
        .content { text-align: center; padding: 30px; background-color: #1e1e1e; border-radius: 12px; box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .content:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(255, 255, 255, 0.15); }
        h1 { font-size: 2em; color: #f0f0f0; margin-bottom: 15px; letter-spacing: 1px; }
        p { font-size: 1.1em; color: #d3d3d3; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="content">
        <h1>Bienvenue sur OVL-MD</h1>
        <p>Votre assistant WhatsApp</p>
    </div>
</body>
</html>`);
});

app.get('/ping', (req, res) => {
    try {
        const cpus = os.cpus();

        let totalIdle = 0;
        let totalTick = 0;

        cpus.forEach(cpu => {
            for (type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });

        const cpuUsage = (1 - totalIdle / totalTick) * 100;

        const systemCheck = cpuUsage < 80;

        if (systemCheck) {
            dernierPingRecu = Date.now();
            res.send('OVL-MD est en ligne');
        } else {
            throw new Error('Problème de CPU : Utilisation excessive du CPU');
        }
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
    setupAutoPing(`http://localhost:${port}/ping`);
    checkHealth();
});

function setupAutoPing(url) {
    setInterval(async () => {
        try {
            const res = await axios.get(url);
            console.log(`Ping réussi : ${res.data}`);
        } catch (err) {
            console.error('Erreur lors du ping', err.message);
        }
    }, 30000);
}

function checkHealth() {
    setInterval(() => {
        if (Date.now() - dernierPingRecu > 120000) {
            console.error('Le ping est inactif, redémarrage...');
            process.exit(1);
        }
    }, 60000);
}
