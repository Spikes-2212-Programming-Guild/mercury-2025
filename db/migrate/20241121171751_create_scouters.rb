class CreateScouters < ActiveRecord::Migration[7.2]
  def change
    create_table :scouters do |t|
      t.string :username

      t.timestamps
    end
  end
end
