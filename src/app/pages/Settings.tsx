import { Settings as SettingsIcon, Bell, Database, Shield, User, Zap } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Settings() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Settings & Configuration
        </h1>
        <p className="text-gray-400">System preferences and node management</p>
      </div>

      {/* User Profile */}
      <div className="bg-gray-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          User Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Admin User" className="bg-gray-800 border-gray-700" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@railway.com" className="bg-gray-800 border-gray-700" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="System Administrator" className="bg-gray-800 border-gray-700" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" defaultValue="IoT Operations" className="bg-gray-800 border-gray-700" />
          </div>
        </div>
        <div className="mt-6">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
            Save Profile
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-400" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Critical Alerts</p>
              <p className="text-sm text-gray-400">Receive notifications for critical system failures</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Low Energy Warnings</p>
              <p className="text-sm text-gray-400">Get notified when node energy drops below threshold</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Communication Failures</p>
              <p className="text-sm text-gray-400">Alert on node communication issues</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Daily Reports</p>
              <p className="text-sm text-gray-400">Receive daily system performance reports</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Maintenance Reminders</p>
              <p className="text-sm text-gray-400">Get reminders for scheduled maintenance</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-400" />
          Alert Thresholds
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="energy-threshold">Low Energy Threshold (%)</Label>
            <Input
              id="energy-threshold"
              type="number"
              defaultValue="40"
              className="bg-gray-800 border-gray-700"
            />
            <p className="text-xs text-gray-400">Alert when node energy drops below this level</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="offline-timeout">Node Offline Timeout (minutes)</Label>
            <Input
              id="offline-timeout"
              type="number"
              defaultValue="30"
              className="bg-gray-800 border-gray-700"
            />
            <p className="text-xs text-gray-400">Mark node as offline after this duration</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vibration-threshold">Abnormal Vibration Threshold</Label>
            <Input
              id="vibration-threshold"
              type="number"
              defaultValue="500"
              className="bg-gray-800 border-gray-700"
            />
            <p className="text-xs text-gray-400">Alert on unusual vibration event count</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reliability-threshold">Minimum Reliability (%)</Label>
            <Input
              id="reliability-threshold"
              type="number"
              defaultValue="70"
              className="bg-gray-800 border-gray-700"
            />
            <p className="text-xs text-gray-400">Alert when reliability score drops below</p>
          </div>
        </div>
        <div className="mt-6">
          <Button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
            Update Thresholds
          </Button>
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-400" />
          System Configuration
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Real-time Updates</p>
              <p className="text-sm text-gray-400">Enable automatic data refresh every 30 seconds</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Data Logging</p>
              <p className="text-sm text-gray-400">Store all sensor data for historical analysis</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">AI Predictions</p>
              <p className="text-sm text-gray-400">Enable machine learning predictions and insights</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Auto-Maintenance Scheduling</p>
              <p className="text-sm text-gray-400">Automatically schedule maintenance based on AI predictions</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-900/50 border border-red-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-400" />
          Security & Access
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Require 2FA for account access</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-gray-400">Auto-logout after 30 minutes of inactivity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <p className="font-medium">Audit Logging</p>
              <p className="text-sm text-gray-400">Track all user actions and system changes</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            Change Password
          </Button>
          <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
            View Activity Log
          </Button>
        </div>
      </div>

      {/* Node Management */}
      <div className="bg-gray-900/50 border border-blue-500/20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-blue-400" />
          Node Management
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <p className="font-medium mb-2">Add New Node</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Node ID" className="bg-gray-700 border-gray-600" />
              <Input placeholder="Node Name" className="bg-gray-700 border-gray-600" />
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                Add Node
              </Button>
            </div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <p className="font-medium mb-2">Remove Node</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Node ID to Remove" className="bg-gray-700 border-gray-600" />
              <div className="md:col-span-2">
                <Button variant="destructive" className="w-full md:w-auto">
                  Remove Node
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
