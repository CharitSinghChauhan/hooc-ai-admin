import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  date: {
    fontSize: 12,
    marginTop: 10,
  },
  recipient: {
    marginBottom: 20,
  },
  salutation: {
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 15,
    textAlign: "justify",
  },
  list: {
    marginLeft: 20,
    marginBottom: 15,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  listItemLabel: {
    fontWeight: "bold",
    width: 100,
  },
  footer: {
    marginTop: 50,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: 200,
    marginTop: 40,
    paddingTop: 5,
  },
  signatureText: {
    fontSize: 10,
  },
});

interface PdfTemplateProps {
  data: {
    fullname: string;
    email: string;
    DOJ: Date;
    till_date?: string;
    paymentType: "stipend" | "unpaid";
    amount?: number;
  };
}

const PdfTemplate: React.FC<PdfTemplateProps> = ({ data }) => {
  const formattedDOJ = data.DOJ
    ? new Date(data.DOJ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>HOOC.AI</Text>
            <Text style={{ fontSize: 10, color: "gray" }}>
              Building Future of AI
            </Text>
          </View>
          <Text style={styles.date}>{today}</Text>
        </View>

        {/* Recipient Info */}
        <View style={styles.recipient}>
          <Text>{data.fullname}</Text>
          <Text>{data.email}</Text>
        </View>

        {/* Content */}
        <Text style={styles.salutation}>Dear {data.fullname},</Text>

        <Text style={styles.paragraph}>
          We are pleased to offer you an internship position at Hooc.ai. We were
          impressed with your skills and background, and we are confident that
          you will be a valuable asset to our team.
        </Text>

        <Text style={styles.paragraph}>
          The terms and conditions of your internship are set forth below:
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemLabel}>Start Date:</Text>
            <Text>{formattedDOJ}</Text>
          </View>

          {data.till_date && (
            <View style={styles.listItem}>
              <Text style={styles.listItemLabel}>End Date:</Text>
              <Text>{data.till_date}</Text>
            </View>
          )}

          <View style={styles.listItem}>
            <Text style={styles.listItemLabel}>Role:</Text>
            <Text>Intern</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemLabel}>Compensation:</Text>
            <Text>
              {data.paymentType === "stipend"
                ? `Stipend of INR ${data.amount} per month`
                : "Unpaid Internship"}
            </Text>
          </View>
        </View>

        <Text style={styles.paragraph}>
          During your internship, you may have access to trade secrets and other
          confidential information belonging to the Company. By accepting this
          offer, you acknowledge that you must keep all of this information
          strictly confidential, and refrain from using it for your own purposes
          or from disclosing it to anyone outside the Company.
        </Text>

        <Text style={styles.paragraph}>
          We look forward to having you join us. Please sign and return a copy
          of this letter to indicate your acceptance of this offer.
        </Text>

        <View style={styles.footer}>
          <Text>Sincerely,</Text>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Hooc.ai Team
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <View>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Authorized Signatory</Text>
          </View>
          <View>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>
              Accepted by {data.fullname}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfTemplate