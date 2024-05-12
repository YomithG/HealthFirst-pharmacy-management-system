import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  feedback: {
    marginBottom: 10,
  },
});

const FeedbackReport = ({ feedbacks }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Feedback Report</Text>
          {feedbacks.map((feedback) => (
            <View key={feedback._id} style={styles.feedback}>
              <Text>Username: {feedback.username}</Text>
              <Text>Content: {feedback.content}</Text>
              <Text>Rating: {feedback.rating}</Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FeedbackReport;
