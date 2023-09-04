import os from 'node:os'
import * as url from 'node:url';
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'

const { command, parser } = getConfigBasedOnOS()
const logActivity = logActivityInit()

setInterval(() => {
    exec(command, (_error, stdout, _stderr) => {
        const { name, cpu, mem } = parser(stdout.trim().split(/\s+/));
        const processInfo = `${cpu} ${mem} ${name}`

        process.stdout.clearLine(0)
        process.stdout.write(`\r${processInfo}`)

        logActivity(processInfo)
    });
}, 100); // 10 times per 1s (1000 mls === 1s)

function getConfigBasedOnOS() {
    const platform = os.platform();
    if (platform === 'win32') {
        return {
            command: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
            parser: (line) => {
                const [name, cpu, workingSet] = line;
                return { name, cpu, mem: workingSet }
            }
        }
    } else if (platform === 'darwin' || platform === 'linux') {
        return {
            command: `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`,
            parser: (line) => {
                const [cpu, mem, comm] = line;
                return { name: comm, cpu, mem }
            }
        }
    } else {
        throw new Error('Not supported OS');
    }
}

function logActivityInit() {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

    const logPeriod = 60 * 1000 // Once per minute program appends the output to the log file
    let lastTimeLogged = Date.now() - logPeriod

    return function (processInfo) {
        const currentDate = Date.now()
        if (lastTimeLogged + logPeriod <= currentDate) {
            lastTimeLogged = currentDate
            const unixTimestamp = Math.floor(currentDate / 1000)
            fs.appendFile(path.join(__dirname, 'activityMonitor.log'), `${unixTimestamp}: ${processInfo}\n`, () => { })
        }
    }
}

