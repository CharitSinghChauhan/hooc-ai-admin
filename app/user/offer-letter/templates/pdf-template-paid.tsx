import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoTextSection: {
    flexDirection: "column",
    marginLeft: 5,
  },
  logoText: {
    fontSize: 24,
    color: "#2E3B89",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 8,
    color: "#666",
    marginTop: 4,
    fontFamily: "Helvetica",
    letterSpacing: 0.5,
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 9,
    color: "#666",
    lineHeight: 1.4,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    color: "#2E3B89",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    textDecoration: "underline",
  },
  label: {
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  addressBlock: {
    marginBottom: 20,
  },
  dateLine: {
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
    alignSelf: "flex-end",
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 12,
    marginTop: 15,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
    color: "#2E3B89",
    textTransform: "uppercase",
  },
  footer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  signatureBlock: {
    marginTop: 10,
    width: "40%",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    marginTop: 50,
    paddingTop: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
    objectFit: "fit",
    border : "2px solid black"
  },
  backgroundImage: {
    position: "absolute",
    top: "30%",
    left: "15%",
    width: 400,
    height: 400,
    opacity: 0.08,
    transform: "rotate(-45deg)",
    zIndex: -100,
  },
});

interface PdfTemplatePaidProps {
  data: {
    fullname: string;
    email: string;
    DOJ: Date;
    till_date: Date;
    fixed?: number;
    variable?: number;
  };
}

const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined) return "₹0";
  return `INR ${amount.toLocaleString("en-IN")}`;
};

const duration = (doj: Date, till_date: Date): string => {
  let months =
    (till_date.getFullYear() - doj.getFullYear()) * 12 +
    (till_date.getMonth() - doj.getMonth());
  if (till_date.getDate() < doj.getDate()) {
    months -= 1;
  }
  if (months <= 0) {
    const days = Math.max(
      0,
      Math.floor((till_date.getTime() - doj.getTime()) / (1000 * 60 * 60 * 24)),
    );
    const dayStr = days === 1 ? "day" : "days";
    return `${days} ${dayStr}`;
  }
  const monthStr = months === 1 ? "month" : "months";
  return `${months} ${monthStr}`;
};

const formatDate = (dateString: Date | string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const PdfTemplatePaid: React.FC<PdfTemplatePaidProps> = ({ data }) => {
  const { fullname, DOJ, till_date, fixed, variable } = data;
  const totalStipend = (fixed || 0) + (variable || 0);
  const offerDate = new Date();

  // TODO : confirm Date
  const confirmDate = new Date(DOJ);
  confirmDate.setDate(confirmDate.getDate() - 1);
  const durationText = duration(DOJ, till_date);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/hooc-agency.png" style={styles.backgroundImage} fixed />
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image src="/hooc-agency.png" style={styles.logoImage} />
            <View style={styles.logoTextSection}>
              <Text style={styles.logoText}>Hooc AI</Text>
              <Text style={styles.tagline}>
                Committed to Your Business Growth
              </Text>
            </View>
          </View>
          <View style={styles.companyInfo}>
            <Text>Visit us at : hooc.tech</Text>
            <Text>Contact: +91 9627162135</Text>
            <Text>work@hooc.tech</Text>
          </View>
        </View>

        <Text style={styles.title}>CONTRACT OFFER LETTER</Text>

        <View style={styles.addressBlock}>
          <Text style={styles.label}>Address:</Text>
          <Text>A-1003</Text>
          <Text>Govindpuram</Text>
          <Text>Ghaziabad, Delhi NCR</Text>
          <Text>India – 201013</Text>
        </View>

        <View style={styles.dateLine}>
          <Text>Date: {formatDate(offerDate)}</Text>
        </View>

        <Text style={styles.paragraph}>
          Dear <Text style={styles.label}>{fullname}</Text>,
        </Text>

        <Text style={styles.paragraph}>
          We, <Text style={styles.label}>Hooc AI Pvt Ltd</Text>, are pleased to
          offer you the position of{" "}
          <Text style={styles.label}>Web Developer Intern</Text> with our
          organization for a duration of {durationText}, commencing from{" "}
          <Text style={styles.label}>{formatDate(DOJ)}</Text> and concluding on{" "}
          <Text style={styles.label}>
            {till_date ? formatDate(till_date) : "TBD"}
          </Text>
          .
        </Text>

        <Text style={styles.paragraph}>
          We believe your skills and technical aptitude will be a valuable
          addition to our team.
        </Text>

        <Text style={styles.paragraph}>
          You are required to join us on {formatDate(DOJ)}. In case you
          anticipate any delay in joining, you must inform us in advance.
          Failure to do so may result in termination of this offer.
        </Text>

        <Text style={styles.sectionTitle}>
          Probation, Stipend & Compensation
        </Text>
        <Text style={styles.paragraph}>
          The first month of your engagement will be considered an unpaid
          probation period.
        </Text>
        <Text style={styles.paragraph}>
          From the second month onward, you will be eligible for a{" "}
          <Text style={styles.label}>
            total stipend of {formatCurrency(totalStipend)} per month
          </Text>{" "}
          (comprising a base performance-linked stipend of{" "}
          {formatCurrency(fixed)} and an additional incentive of{" "}
          {formatCurrency(variable)}), subject to performance, consistency, and
          project requirements. Continuation of the internship, as well as
          eligibility for the stipend and incentive, is strictly dependent on
          satisfactory performance, discipline, and adherence to company
          policies.
        </Text>

        <Text style={styles.sectionTitle}>Working Hours and Location</Text>
        <Text style={styles.paragraph}>
          This is a full-time position requiring a minimum of 9 hours per day,
          including breaks. Working days are Monday to Saturday.
        </Text>

        <Text style={styles.sectionTitle}>
          Confidentiality and Intellectual Property
        </Text>
        <Text style={styles.paragraph}>
          You acknowledge that all confidential information and intellectual
          property, including but not limited to source code, designs, data,
          documentation, customer information, and trade secrets, are the
          exclusive property of the Company. You agree not to disclose such
          information to any third party without prior written consent and to
          assign all rights related to work created during the internship to the
          Company.
        </Text>

        <Text style={styles.sectionTitle}>Background Verification</Text>
        <Text style={styles.paragraph}>
          The Company reserves the right to conduct background verification at
          any stage during the internship. Failure to meet verification
          requirements may result in immediate termination.
        </Text>

        <Text style={styles.sectionTitle}>Notice Period</Text>
        <Text style={styles.paragraph}>
          Either party may terminate the internship by providing Two week&apos;s
          prior written notice to ensure a smooth transition.
        </Text>

        <Text style={styles.sectionTitle}>Acceptance of Offer</Text>
        <Text style={styles.paragraph}>
          You are requested to confirm your acceptance of this offer on or
          before {formatDate(confirmDate)}. This offer shall automatically lapse
          if not accepted within the stipulated period.
        </Text>
        <Text style={styles.paragraph}>
          By signing below, you confirm your acceptance of the terms and
          conditions mentioned herein. We look forward to welcoming you to Hooc
          AI Pvt. Ltd.
        </Text>

        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text>Sincerely,</Text>
            <View style={styles.signatureLine}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Shivansh Srivastava
              </Text>
              <Text>Program Manager</Text>
              <Text>Hooc AI Pvt Ltd</Text>
              <Text style={{ marginTop: 5 }}>work@hooc.tech</Text>
            </View>
          </View>

          <View style={styles.signatureBlock}>
            <Text>Accepted by:</Text>
            <View style={styles.signatureLine}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{fullname}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfTemplatePaid;
