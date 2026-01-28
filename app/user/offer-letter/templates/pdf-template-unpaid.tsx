import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./pdf-template-paid";

interface PdfTemplateUnpaidProps {
  data: {
    fullname: string;
    DOJ: Date;
    till_date?: Date;
  };
}

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

const PdfTemplateUnpaid: React.FC<PdfTemplateUnpaidProps> = ({ data }) => {
  const { fullname, DOJ, till_date } = data;
  const offerDate = new Date();

  // TODO : confirm Date
  const confirmDate = new Date(DOJ);
  confirmDate.setDate(confirmDate.getDate() - 1);
  const durationText = till_date ? duration(DOJ, till_date) : "";

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
          <Text style={styles.label}>Software Engineering Intern</Text> with our
          organization
          {durationText ? ` for a duration of ${durationText}` : ""}, commencing
          from <Text style={styles.label}>{formatDate(DOJ)}</Text>
          {till_date ? (
            <>
              {" "}
              and concluding on{" "}
              <Text style={styles.label}>{formatDate(till_date)}</Text>
            </>
          ) : (
            ""
          )}
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

        <Text style={styles.sectionTitle}>Working Hours and Location</Text>
        <Text style={styles.paragraph}>
          This is a full-time position that requires a minimum of 6 hours per
          day including breaks. We have working days from Monday to Friday.
          However, based on project requirements and business needs, you may be
          required to work on weekends. In such cases, prior notice will be
          provided. Additional shift allowances will be provided for weekend
          support. The holidays will be decided by Management as per the
          situation.
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
          Either party may terminate the internship by providing One week&apos;s
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

export default PdfTemplateUnpaid;
