import fs from 'fs';
import os from 'os';
import winston from 'winston';
import winstonSyslog from 'winston-syslog';

// Sett tidssonen eksplisitt for å sikre riktig timestamp i logging til archsight
process.env.TZ = 'Europe/Oslo';

const { NAIS_APP_NAME } = process.env;

export const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

const secureLogPath = () =>
    fs.existsSync('/secure-logs/') ? '/secure-logs/secure.log' : './secure.log';

export const secureLog = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: secureLogPath(),
            maxsize: 50000000,
        }),
    ],
});

export const auditLog = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.printf(({ message }) => message),
    transports: [
        new winstonSyslog.Syslog({
            host: 'audit.nais',
            port: 6514,
            app_name: NAIS_APP_NAME,
            protocol: 'tcp',
            localhost: os.hostname(),
            eol: '\n', // Trengs for å kunne logge til rsyslog server
        }),
    ],
});

export const opprettLoggmeldingForAuditlogg = (
    melding: string,
    fnrEllerAktørId: string,
    navIdent: string,
    end = currentTimeForAuditlogg()
): string => {
    const header = `CEF:0|Rekrutteringsbistand|${NAIS_APP_NAME}|1.0|audit:access|Sporingslogg|INFO`;

    const extension = `flexString1=Permit\
            msg=${melding}\
            duid=${fnrEllerAktørId}
            flexString1Label=Decision\
            end=${end}\
            suid=${navIdent}`.replace(/\s+/g, ' ');

    return `${header}|${extension}`;
};

export const currentTimeForAuditlogg = () => Date.now();
