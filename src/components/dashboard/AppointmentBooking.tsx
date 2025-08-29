import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  type: string;
  therapist: string;
  date: string;
  time: string;
  location: string;
  status: "scheduled" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    type: "Physical Therapy",
    therapist: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "2:00 PM",
    location: "Room 201, Main Building",
    status: "scheduled"
  },
  {
    id: "2",
    type: "Mental Health Session",
    therapist: "Dr. Michael Chen",
    date: "2024-01-16",
    time: "10:00 AM", 
    location: "Room 305, Wellness Center",
    status: "scheduled"
  },
  {
    id: "3",
    type: "Occupational Therapy",
    therapist: "Lisa Rodriguez",
    date: "2024-01-12",
    time: "3:30 PM",
    location: "Room 150, Therapy Wing",
    status: "completed"
  }
];

export function AppointmentBooking() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-info text-info-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booking",
      description: "This feature will be available once Supabase is connected for data storage.",
    });
  };

  const handleReschedule = (appointmentId: string) => {
    toast({
      title: "Reschedule Appointment", 
      description: "This feature will be available once Supabase is connected.",
    });
  };

  const handleCancel = (appointmentId: string) => {
    toast({
      title: "Cancel Appointment",
      description: "This feature will be available once Supabase is connected.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Appointment Booking</h1>
          <p className="text-muted-foreground">Manage your therapy appointments and schedule new ones</p>
        </div>
        <Button onClick={handleBookAppointment} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Book New Appointment
        </Button>
      </div>

      {/* AI Scheduling Suggestion */}
      <Card className="border-l-4 border-l-info bg-info/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-info" />
            AI Scheduling Suggestion
          </CardTitle>
          <CardDescription>
            Based on your progress and availability, we recommend scheduling your next physical therapy session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Physical Therapy Follow-up</p>
              <p className="text-sm text-muted-foreground">Suggested: January 18, 2024 at 2:00 PM</p>
            </div>
            <Button variant="outline" onClick={handleBookAppointment}>
              Accept Suggestion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled therapy sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointments
            .filter(apt => apt.status === "scheduled")
            .map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <h3 className="font-semibold">{appointment.type}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {appointment.therapist}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {appointment.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleCancel(appointment.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Past Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Appointment History</CardTitle>
          <CardDescription>Your completed and cancelled appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointments
            .filter(apt => apt.status !== "scheduled")
            .map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg opacity-75">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <h3 className="font-semibold">{appointment.type}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {appointment.therapist}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}