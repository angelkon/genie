package com.geninetworks.genie;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 *
 * @author doripark
 */
public class SSHAgent {

    private Session session;
    private ChannelExec channel;

    public ChannelExec getChannel() {
        return channel;
    }

    public void setChannel(ChannelExec channel) {
        this.channel = channel;
    }

    public SSHAgent(String hostName, String userName, String password) throws JSchException {
        connect(hostName, userName, password);
    }

    public void connect(String hostName, String userName, String password) throws JSchException {
        JSch jsch = new JSch();
        session = jsch.getSession(userName, hostName, 10022);
        session.setPassword(password);
        Properties config = new Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
        session.connect();
        channel = (ChannelExec) session.openChannel("exec");
    }

    public void disConnect() {
        channel.disconnect();
        session.disconnect();
    }

    public static void main(String[] args) {
        SSHAgent agent = null;
        try {
            agent = new SSHAgent(args[0], args[1], args[2]);
            BufferedReader in = new BufferedReader(new InputStreamReader(agent.getChannel().getInputStream()));
            agent.getChannel().setCommand("df -k;top -b -n 1;sudo apt-get update -y && sudo apt-get upgrade -y");
            agent.getChannel().connect();
            String msg = null;
            while ((msg = in.readLine()) != null) {
                System.out.println(msg);
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            if (agent != null) {
                agent.disConnect();
            }
        }

    }
}
