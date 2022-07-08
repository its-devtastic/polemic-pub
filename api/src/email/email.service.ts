import { Injectable } from "@nestjs/common";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  client: SESv2Client;

  constructor(private configService: ConfigService) {
    this.client = new SESv2Client({
      region: configService.get("AWS_SES_REGION"),
    });
  }

  public async send({ recipients, subject, html, plain }: EmailSpec) {
    const command = new SendEmailCommand({
      Destination: { ToAddresses: recipients },
      FromEmailAddress: this.configService.get("EMAIL_FROM_ADDRESS"),
      Content: {
        Simple: {
          Subject: {
            Data: subject,
          },
          Body: {
            Html: {
              Data: html,
            },
            Text: {
              Data: plain,
            },
          },
        },
      },
    });
    try {
      await this.client.send(command);
    } catch (e) {
      console.error(e);
    }
  }
}

interface EmailSpec {
  subject: string;
  html: string;
  plain: string;
  recipients: string[];
}
